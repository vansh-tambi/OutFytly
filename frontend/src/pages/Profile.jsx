import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState(null); // This useEffect correctly syncs the form and avatar with the global user state.

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.name,
        email: user.email,
        bio: user.bio || "",
      }); // If an avatar exists in the database (it's a full URL), display it.

      if (user.avatar && user.avatar.startsWith("http")) {
        setAvatarPreview(user.avatar);
        console.log(setAvatarFile);
      } else {
        // --- ✅ THE UPGRADE ---
        // Generate initials from the user's name
        const nameParts = user.name.split(" ");
        const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
        const lastNameInitial =
          nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : "";
        const initials = `${firstNameInitial}${lastNameInitial}`.toUpperCase();

        // Use a service to generate an avatar from initials, styled with your theme colors
        const fallbackAvatarUrl = `https://ui-avatars.com/api/?name=${initials}&background=8A2BE1&color=fff&bold=true`;

        setAvatarPreview(fallbackAvatarUrl);
      }
    }
  }, [user, reset]);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        name: data.fullName,
        bio: data.bio,
      };

      if (avatarFile) {
        const formData = new FormData();
        formData.append("image", avatarFile);

        const uploadRes = await api.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        updatedData.avatar = uploadRes.data.url; // Use the URL from Cloudinary
      }

      await updateUserProfile(updatedData);

      toast.success("Profile updated successfully!");
      setAvatarFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || String(error));
    }
  };

  if (!user) {
    return <div className="text-white text-center p-10">Loading...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
           {" "}
      <h1 className="text-3xl font-bold text-white mb-6">Profile Settings</h1> 
         {" "}
      <div className="bg-ink p-8 rounded-2xl shadow-lg border border-lavender/20">
               {" "}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                   {" "}
          <div className="flex items-center gap-6">
                       {" "}
            <img
              src={avatarPreview}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-primary"
            />
                       {" "}
            <div>
                           {" "}
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/80 transition"
              >
                                Change Picture              {" "}
              </label>
                           {" "}
              <input
                id="avatar-upload"
                type="file"
                className="hidden"
                onChange={onFileChange}
                accept="image/*"
              />
                         {" "}
            </div>
                     {" "}
          </div>
                   {" "}
          <div>
                        <label className="form-label">Full Name</label>         
             {" "}
            <input
              {...register("fullName", { required: "Full name is required" })}
              className="form-input mt-2"
            />
                       {" "}
            {errors.fullName && (
              <p className="form-error">{errors.fullName.message}</p>
            )}
                     {" "}
          </div>
                   {" "}
          <div>
                        <label className="form-label">Email Address</label>     
                 {" "}
            <input
              {...register("email")}
              disabled
              className="form-input mt-2 bg-plum cursor-not-allowed"
            />
                     {" "}
          </div>
                   {" "}
          <div>
                        <label className="form-label">Bio</label>           {" "}
            <textarea
              {...register("bio")}
              rows="3"
              className="form-input mt-2"
              placeholder="Tell us a little about yourself"
            />
                     {" "}
          </div>
                   {" "}
          <div className="flex justify-end">
                       {" "}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-lavender text-plum px-6 py-2 rounded-lg font-semibold hover:bg-white transition disabled:opacity-50"
            >
                            {isSubmitting ? "Saving..." : "Save Changes"}       
                 {" "}
            </button>
                     {" "}
          </div>
                 {" "}
        </form>
             {" "}
      </div>
         {" "}
    </motion.div>
  );
};

export default Profile;
