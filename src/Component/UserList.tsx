import { useState, useEffect, SetStateAction } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://65e5cddcd7f0758a76e77232.mockapi.io/user"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };
  const filteredUsers = users.filter(
    (user: { name: string; email: string }) => {
      return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  );

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        className="p-2 border border-gray-300 rounded mb-4 w-full"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearch}
      />

      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(
            (user: {
              id: string;
              name: string;
              email: string;
              phoneNumber: string;
            }) => (
              <tr key={user.id} className="bg-white border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phoneNumber}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
