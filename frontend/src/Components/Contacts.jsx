import axios from "axios";
import { toast } from "react-hot-toast";

export default function Contacts({ contacts, setContacts }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;
    try {
      const res = await axios.delete(
        `https://contact-management-web-app-e7cs.onrender.com/api/delete/${id}`
      );
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      toast.success(res?.data?.message || "Contact deleted");
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete contact");
    }
  };

    return (
      <section className="px-6 py-8 w-full">
        <div className="max-w-full mx-auto">
          <h2 className="text-4xl font-semibold text-gray-900 mb-6">
            Contacts
          </h2>

          <div className="rounded-lg border border-gray-200 bg-white shadow-sm w-full">
            {/* horizontal scroll on small screens; table will expand on large screens */}
            <div className="w-full overflow-x-auto">
              <table className="min-w-300 w-full table-auto text-left text-base">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-8 py-4 text-gray-700 w-[18%]">Name</th>
                    <th className="px-8 py-4 text-gray-700 w-[28%]">Email</th>
                    <th className="px-8 py-4 text-gray-700 w-[14%]">Phone</th>
                    <th className="px-8 py-4 text-gray-700 w-[28%]">Message</th>
                    <th className="px-8 py-4 text-gray-700 w-[12%]">
                      Created At
                    </th>
                    <th className="px-8 py-4 text-center text-gray-700 w-[8%]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {contacts && contacts.length > 0 ? (
                    contacts.map((contact) => (
                      <tr key={contact._id} className="hover:bg-gray-50">
                        <td className="px-8 py-5 align-top">
                          <div className="font-medium text-gray-900">
                            {contact.name}
                          </div>
                        </td>

                        <td className="px-8 py-5 align-top">
                          <div className="text-gray-700 wrap-break-word">
                            {contact.email}
                          </div>
                        </td>

                        <td className="px-8 py-5 align-top">
                          <div className="text-gray-700 whitespace-nowrap">
                            {contact.phone || "-"}
                          </div>
                        </td>

                        <td className="px-8 py-5 align-top">
                          <div className="text-gray-700 wrap-break-word max-w-160">
                            {contact.message}
                          </div>
                        </td>

                        <td className="px-8 py-5 align-top whitespace-nowrap text-gray-600">
                          {contact.createdAt
                            ? new Date(contact.createdAt).toLocaleString()
                            : "-"}
                        </td>

                        <td className="px-8 py-5 text-center align-top">
                          <button
                            onClick={() => handleDelete(contact._id)}
                            className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
                            aria-label={`Delete ${contact.name}`}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center text-gray-500 py-12"
                      >
                        No contacts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
}
