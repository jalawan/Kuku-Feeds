import { useState } from 'react';
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout';
import { toast, Toaster } from 'sonner';
import { useAddFeedDescMutation } from '../../Features/api/FeedApi';
import axios from 'axios';
import type { FeedDescriptions } from '../../types/Types';

const AddFeedDescription = () => {
  const preset_key = 'carRental';
  const cloud_name = 'dwkwtexgk';

  // Image preview and upload state
  const [image1, setImage1] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  const [addDesc, { isLoading: isSubmitting }] = useAddFeedDescMutation();

 const [formData, setFormData] = useState<{
    feed_name :string;
    feed_type :string;
    description:string;
    quantity:number;
    
    imageURL: string;
}>({
    feed_name :'',
    feed_type :'',
    description:'',
    imageURL: '',
    quantity:0,
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload to Cloudinary
  const handleFile1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataCloud = new FormData();
    formDataCloud.append('file', file);
    formDataCloud.append('upload_preset', preset_key);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formDataCloud
      );

      const imageUrl = res.data.secure_url;
      setImage1(imageUrl);

      // Update formData with the Cloudinary URL
      setFormData((prev) => ({ ...prev, imageURL: imageUrl }));

      toast.success('Image uploaded successfully!');
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

//  const [addDesc, { isLoading: isSubmitting }] = useAddFeedDescMutation();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.imageURL) {
    toast.error('Please upload an image first');
    return;
  }

  const payload: FeedDescriptions = {
    feedDesc_id: 0, // Placeholder, will be set by backend
    feed_id: 0, // Placeholder, will be set by backend
    feed_name: formData.feed_name,
    feed_type: formData.feed_type,
    quantity: Number(formData.quantity),
    description: formData.description,
    is_active: true, // Placeholder, adjust as needed
    imageURL: formData.imageURL,
  };

  try {
    await addDesc(payload).unwrap();
    toast.success('Feed Description Created Successfully!');

    // Reset form
    setFormData({
      feed_name: '',
      feed_type: '',
      description:'',
      imageURL: '',
      quantity:0,
    });
    setImage1('');
  } catch (error: any) {
    toast.error(error?.data?.message || 'Failed to create description');
  }
};

  return (
    <AdminDashboardLayout>
      <Toaster position="top-center" richColors />
      <h1 className="text-2xl font-bold mb-6">Add Feed Description</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-5 max-w-2xl">

        {/* Form Fields */}
        <input
          name="manufacturer"
          value={formData.feed_name}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Manufacturer (e.g. Toyota)"
          required
        />

        <input
          name="model"
          value={formData.feed_type}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Model (e.g. Growers)"
          required
        />

        <input
          name="feed_type"
          value={formData.description}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Fuel Type (Petrol/Diesel/Electric)"
          required
        />
        <input
          name="seating_capacity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Seating Capacity"
          min="1"
          max="50"
          required
        />

      

        <textarea
          name="features"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full h-28"
          placeholder="Features (comma separated or bullet points)"
          required
        />

        {/* Image Upload Section */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">Feed Image</label>
          
          <input
            type="file"
            accept="image/*"
            onChange={handleFile1}
            className="file-input file-input-bordered w-full"
            disabled={uploading}
            required={!image1} // Only required if no image yet
          />

          {uploading && (
            <p className="text-sm text-blue-600 animate-pulse">Uploading image...</p>
          )}

          {image1 && (
            <div className="flex items-center gap-4 mt-3">
              <img
                src={image1}
                alt="Feed preview"
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
              <p className="text-sm text-green-600 font-medium">Image ready!</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className="btn bg-black text-yellow-500 hover:bg-gray-900 w-full font-semibold text-lg"
        >
          {isSubmitting || uploading ? 'Saving...' : 'Save Description'}
        </button>
      </form>
    </AdminDashboardLayout>
  );
};

export default AddFeedDescription;