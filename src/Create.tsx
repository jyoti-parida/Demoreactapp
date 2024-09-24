import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: File ; // added avatar field
}

interface FormErrors {
  name: string;
  email: string;
  avatar: string; // added avatar error field
}

const UserForm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<FormErrors>({ name: '', email: '', avatar: '' });
  const [avatar, setAvatar] = useState<File | null>(null); // added avatar state
  const [agreeTerms, setAgreeTerms] = useState(false); // added agree terms state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('https://api.example.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { name: '', email: '', avatar: '' };

    if (name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!avatar) {
      newErrors.avatar = 'Avatar is required';
      isValid = false;
    }

    if (!agreeTerms) {
      newErrors.avatar = 'You must agree to the terms';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      if (editingId) {
        await axios.put(`https://api.example.com/users/${editingId}`, formData);
      } else {
        await axios.post('https://api.example.com/users', formData);
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (user: User) => {
    setName(user.name);
    setEmail(user.email);
    setAvatar(null); // reset avatar
    setEditingId(user.id);
    setErrors({ name: '', email: '', avatar: '' });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://api.example.com/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setAvatar(null);
    setEditingId(null);
    setErrors({ name: '', email: '', avatar: '' });
    setAgreeTerms(false);
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div className="mb-4">
          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files![0])}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
          {errors.avatar && <span style={{ color: 'red' }}>{errors.avatar}</span>}
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mr-2"
          />
          I agree to the terms and conditions
          {errors.avatar && <span style={{ color: 'red' }}>{errors.avatar}</span>}
        </div>
        <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          {editingId ? 'Update' : 'Submit'}
        </button>
        {editingId && <button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>}
      </form>
      <ul className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between mb-4">
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Edit</button>
            <button onClick={() => handleDelete(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;