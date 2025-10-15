"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { IUser } from "../../../types/user";
import api from "../../../lib/axios";
import { useAuth } from "../../../hooks/useAuth";

export default function UserProfilePage() {
  const { isLoggedIn, user: me, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({});
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn && !authLoading) {
      router.push("/Components/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/users/${userId}`);
        setUser(res.data);
        setForm(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [isLoggedIn, authLoading, userId, router]);

  const onChange = (key: string, value: any) =>
    setForm((prev: any) => ({ ...prev, [key]: value }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      });

      if (password) formData.append("password", password);
      if (imageFile) formData.append("profileImage", imageFile);

      const response = await api.put(`/api/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(response.data);
      alert("User updated successfully!");
      router.push("/Components/dashboard");

      setPassword("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message ?? "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(user);
    setPassword("");
    router.push("/Components/dashboard");
    setImageFile(null);
    setImagePreview(null);
  };

  if (authLoading || loading || !user)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-600">
        Loading user profile...
      </div>
    );

  const isAdmin = me?.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {isAdmin ? `Edit Profile - ${user.name}` : `${user.name}'s Profile`}
        </h2>

        {error && (
          <div className="mb-4 bg-red-100 text-red-600 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Profile Image Section */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border border-gray-200">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-4xl font-bold bg-gray-200 text-gray-500">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {isAdmin && (
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs py-1 px-3 rounded-full cursor-pointer hover:bg-blue-700 transition">
                Change
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Email"
            value={form.email ?? ""}
            editable={isAdmin}
            onChange={(val) => onChange("email", val)}
          />

          {isAdmin && (
            <InputField
              label="Password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(val) => setPassword(val)}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          {[
            "name",
            "role",
            "age",
            "phone",
            "address",
            "city",
            "country",
            "zipCode",
          ].map((field) => (
            <InputField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field === "age" ? "number" : "text"}
              value={form[field] ?? ""}
              editable={isAdmin}
              onChange={(val) => onChange(field, val)}
            />
          ))}
        </div>

        {/* Buttons */}
        {isAdmin && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition shadow"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🔹 Reusable Input Component */
const InputField = ({
  label,
  value,
  onChange,
  editable = false,
  type = "text",
  placeholder = "",
}: {
  label: string;
  value: any;
  onChange?: (val: any) => void;
  editable?: boolean;
  type?: string;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {editable ? (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
    ) : (
      <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
        {value || "-"}
      </p>
    )}
  </div>
);
