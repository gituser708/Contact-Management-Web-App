import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

const baseCountryOptions = [
  { code: "+91", label: "🇮🇳 India", iso: "IN", digits: 10 },
  { code: "+1", label: "🇺🇸 USA", iso: "US", digits: 10 },
  { code: "+44", label: "🇬🇧 UK", iso: "GB", digits: 10 },
  { code: "+61", label: "🇦🇺 Australia", iso: "AU", digits: 9 },
  { code: "+971", label: "🇦🇪 UAE", iso: "AE", digits: 9 },
  { code: "+81", label: "🇯🇵 Japan", iso: "JP", digits: 10 },
  { code: "+49", label: "🇩🇪 Germany", iso: "DE", digits: 10 },
  { code: "+33", label: "🇫🇷 France", iso: "FR", digits: 9 },
  { code: "+39", label: "🇮🇹 Italy", iso: "IT", digits: 9 },
  { code: "+55", label: "🇧🇷 Brazil", iso: "BR", digits: 11 },
];

export default function ContactForm({ onSuccess }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Your name is required!"),
      email: Yup.string()
        .email("Please enter a valid email!")
        .required("Email is required!"),
      countryCode: Yup.string().required("Please select your country code!"),
      phone: Yup.string()
        .required("Phone number is required!")
        .test("valid-phone", "Invalid phone number length", function (value) {
          const { countryCode } = this.parent;
          const match = baseCountryOptions.find((c) => c.code === countryCode);
          if (!match) return true;
          if (!value) return false;
          if (match.iso === "GB") return /^\d{10,11}$/.test(value);
          const regex = new RegExp(`^\\d{${match.digits}}$`);
          return regex.test(value);
        }),
      message: Yup.string().required("Please add a message!"),
    }),
    validateOnChange: true,
    onSubmit: async (values, { resetForm }) => {
      toast.loading("Submitting...", { id: "Contact" });
      try {
        const payload = {
          name: values.name,
          email: values.email,
          phone: `${values.countryCode}${values.phone}`,
          message: values.message,
        };

        const response = await axios.post(
          "http://localhost:5000/api/contact-form",
          payload
        );

        if (response.status === 201) {
          toast.success(response?.data?.message || "Contact saved", {
            id: "Contact",
          });
          resetForm();

          //! notify parent to update list instantly
          if (onSuccess) {
            const created = response.data?.contact || {
              ...payload,
              createdAt: new Date().toISOString(),
              _id: response.data?.id || `${Date.now()}`,
            };
            onSuccess(created);
          }
        } else {
          toast.error("Unexpected response from server", { id: "Contact" });
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Submission failed", {
          id: "Contact",
        });
      }
    },
  });

  return (
    <section className="px-6 py-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">
          Please Fill Out Your Details
        </h2>

        <form
          className="space-y-4 bg-white text-gray-800 p-6 rounded-lg shadow-md"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Your Name"
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${
                formik.touched.name && formik.errors.name
                  ? "border-red-400 ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Phone</label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={formik.values.countryCode}
                onChange={formik.handleChange}
                className="px-2 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none"
              >
                {baseCountryOptions.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label} {opt.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                inputMode="numeric"
                value={formik.values.phone}
                onChange={(e) =>
                  formik.setFieldValue(
                    "phone",
                    e.target.value.replace(/\D/g, "")
                  )
                }
                onBlur={formik.handleBlur}
                placeholder="Phone Number"
                className={`flex-1 px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${
                  formik.touched.phone && formik.errors.phone
                    ? "border-red-400 ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Valid Email ID"
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-400 ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows="3"
              placeholder="Type your query"
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${
                formik.touched.message && formik.errors.message
                  ? "border-red-400 ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            />
            {formik.touched.message && formik.errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.message}
              </p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-800 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
