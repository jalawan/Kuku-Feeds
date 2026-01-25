import { useState } from 'react';
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout';
import { toast, Toaster } from 'sonner';
import { useAddVehicleSpecMutation } from '../../features/api/VehicleApi';
import axios from 'axios';
import type { VehicleSpecifications } from '../../types/Types';

const AddVehicleSpecification = () => {
  const preset_key = 'carRental';
  const cloud_name = 'dwkwtexgk';

  // Image preview and upload state
  const [image1, setImage1] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  const [addSpec, { isLoading: isSubmitting }] = useAddVehicleSpecMutation();

 const [formData, setFormData] = useState<{
  manufacturer: string;
  model: string;
  year: string; // keep as string for input, convert on submit
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: string;
  color: string;
  features: string;
  imageURL: string;
}>({
  manufacturer: '',
  model: '',
  year: '',
  fuel_type: '',
  engine_capacity: '',
  transmission: '',
  seating_capacity: '',
  color: '',
  features: '',
  imageURL: '',
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

//  const [addSpec, { isLoading: isSubmitting }] = useAddVehicleSpecMutation();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.imageURL) {
    toast.error('Please upload an image first');
    return;
  }

  const payload: VehicleSpecifications = {
    vehicleSpec_id: 0, // Placeholder, will be set by backend
    vehicle_id: 0, // Placeholder, will be set by backend
    manufacturer: formData.manufacturer,
    model: formData.model,
    year: Number(formData.year),
    fuel_type: formData.fuel_type,
    engine_capacity: formData.engine_capacity,
    transmission: formData.transmission,
    rental_rate: 0, // Placeholder, adjust as needed
    availability: true, // Placeholder, adjust as needed
    seating_capacity: Number(formData.seating_capacity),
    color: formData.color,
    features: formData.features,
    imageURL: formData.imageURL,
  };

  try {
    await addSpec(payload).unwrap();
    toast.success('Vehicle Specification Created Successfully!');

    // Reset form
    setFormData({
      manufacturer: '',
      model: '',
      year: '',
      fuel_type: '',
      engine_capacity: '',
      transmission: '',
      seating_capacity: '',
      color: '',
      features: '',
      imageURL: '',
    });
    setImage1('');
  } catch (error: any) {
    toast.error(error?.data?.message || 'Failed to create specification');
  }
};

  return (
    <AdminDashboardLayout>
      <Toaster position="top-center" richColors />
      <h1 className="text-2xl font-bold mb-6">Add Vehicle Specification</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-5 max-w-2xl">

        {/* Form Fields */}
        <input
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Manufacturer (e.g. Toyota)"
          required
        />

        <input
          name="model"
          value={formData.model}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Model (e.g. Camry)"
          required
        />

        <input
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Year (e.g. 2023)"
          min="1900"
          max="2030"
          required
        />

        <input
          name="fuel_type"
          value={formData.fuel_type}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Fuel Type (Petrol/Diesel/Electric)"
          required
        />

        <input
          name="engine_capacity"
          value={formData.engine_capacity}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Engine Capacity (e.g. 2000cc)"
          required
        />

        <input
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Transmission (Manual/Automatic)"
          required
        />

        <input
          name="seating_capacity"
          type="number"
          value={formData.seating_capacity}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Seating Capacity"
          min="1"
          max="50"
          required
        />

        <input
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Color"
          required
        />

        <textarea
          name="features"
          value={formData.features}
          onChange={handleChange}
          className="textarea textarea-bordered w-full h-28"
          placeholder="Features (comma separated or bullet points)"
          required
        />

        {/* Image Upload Section */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">Vehicle Image</label>
          
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
                alt="Vehicle preview"
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
          {isSubmitting || uploading ? 'Saving...' : 'Save Specification'}
        </button>
      </form>
    </AdminDashboardLayout>
  );
};

export default AddVehicleSpecification;