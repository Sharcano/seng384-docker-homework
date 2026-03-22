import { useEffect, useState } from "react";
import { getPeople, updatePerson, deletePerson } from "../services/api";

function PeoplePage() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [rowError, setRowError] = useState(null);

  async function fetchAll() {
    try {
      setLoading(true);
      const data = await getPeople();
      setPeople(data);
      setError(null);
    } catch {
      setError("Failed to load people.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  function startEdit(person) {
    setEditId(person.id);
    setEditName(person.full_name);
    setEditEmail(person.email);
    setRowError(null);
  }

  function cancelEdit() {
    setEditId(null);
    setEditName("");
    setEditEmail("");
    setRowError(null);
  }

  async function saveEdit(id) {
    if (!editName.trim() || !editEmail.trim()) {
      setRowError("Both fields are required.");
      return;
    }

    try {
      await updatePerson(id, { full_name: editName.trim(), email: editEmail.trim() });
      cancelEdit();
      fetchAll();
    } catch (err) {
      if (err.error === "EMAIL_ALREADY_EXISTS") {
        setRowError("This email is already taken.");
      } else {
        setRowError("Update failed.");
      }
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await deletePerson(id);
      fetchAll();
    } catch {
      alert("Delete failed. Please try again.");
    }
  }

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <div className="msg msg-error">{error}</div>;

  return (
    <div>
      <h2 className="page-title">People List</h2>

      {people.length === 0 ? (
        <p className="empty-state">No people registered yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>

                  {editId === p.id ? (
                    <>
                      <td>
                        <input
                          className="edit-input"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="edit-input"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                        />
                      </td>
                      <td className="actions-cell">
                        <button
                          className="btn btn-sm btn-save"
                          onClick={() => saveEdit(p.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-cancel"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                        {rowError && <div className="row-error">{rowError}</div>}
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{p.full_name}</td>
                      <td>{p.email}</td>
                      <td className="actions-cell">
                        <button
                          className="btn btn-sm btn-edit"
                          onClick={() => startEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-delete"
                          onClick={() => handleDelete(p.id, p.full_name)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PeoplePage;
