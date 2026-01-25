import React from 'react'

import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Clipboard } from 'lucide-react'
import { FeedsApi } from '../../Features/api/FeedApi'
import { toast } from 'sonner'

import type { Feeds } from '../../types/Types'



const AllFeeds: React.FC = () => {
    // Hooks at the top level
    const { data: vehicles, isLoading, error } = FeedsApi.useGetAllvehicleQuery();
    const [updateFeeds, { isLoading: isUpdatingFeeds }] = FeedsApi.useUpdatevehicleMutation();
    const [deletevehicle, { isLoading: isDeletingFeeds }] = FeedsApi.useDeletevehicleMutation();

    return (
        <AdminDashboardLayout>
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <Clipboard className="text-purple-600" size={24} />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Feeds Management</h1>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">All Feeds</h3>
                <p className="text-gray-500">This page displays all Feeds available in the lot.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                {isLoading && (
                    <div className="text-center py-8">
                        <span className="loading loading-spinner"></span>
                    </div>
                )}

                {error && (
                    <div className="text-center py-8 text-red-600">
                        <p>Error loading vehicles.</p>
                        <pre className="text-xs mt-2">{JSON.stringify((error as any)?.data || error, null, 2)}</pre>
                    </div>
                )}

                {!isLoading && !error && (!vehicles || vehicles.length === 0) && (
                    <div className="text-center py-8 text-gray-500">No vehicles found.</div>
                )}

                {!isLoading && !error && vehicles && vehicles.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table  w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>vehicle_spec_id</th>
                                    <th>rental_rate</th>
                                    <th>availability</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.map((item: Feeds, idx: number) => (
                                    <tr key={item.vehicle_id}>
                                        <th>{idx + 1}</th>
                                        <td>{item.vehicle_spec_id}</td>
                                        <td className="truncate max-w-xs">{item.rental_rate}</td>
                                        <td>
                                        <span
                                            className={`badge ${
                                            item.availability ? "badge-success" : "badge-error"
                                            }`}
                                        >
                                            {item.availability ? "Available" : "Unavailable"}
                                        </span>
                                        </td>

                                        <td className="flex gap-2">
                                            <button
                                            className={`btn btn-sm ${item.availability ? "btn-error" : "btn-success"}`}
                                            disabled={isUpdatingFeeds}
                                            onClick={async () => {
                                                try {
                                                await updateFeeds({
                                                    vehicle_id: item.vehicle_id,
                                                    vehicle_spec_id: item.vehicle_spec_id,
                                                    availability: !item.availability, 
                                                }).unwrap();

                                                toast.success(
                                                    item.availability
                                                    ? "Feeds marked as UNAVAILABLE"
                                                    : "Feeds marked as AVAILABLE"
                                                );
                                                } catch (err: any) {
                                                console.error(err);
                                                toast.error("Failed to update vehicle");
                                                }
                                            }}
                                            >
                                            {item.availability ? "Make Unavailable" : "Make Available"}
                                            </button>

                                           {/*Inside your delete button click handler*/}
                                            <button
                                            className="btn btn-sm btn-error"
                                            onClick={async () => {
                                                if (!confirm("Are you sure you want to delete this vehicle?")) return;

                                                try {
                                                // Pass the vehicle_id directly
                                                const response: any = await deletevehicle(item.vehicle_id).unwrap();

                                                // Show success toast
                                                toast.success(response.message || "🗑️ Feeds deleted successfully");

                                                } catch (err: any) {
                                                console.error(err);

                                                // Friendly message for foreign key constraint
                                                if (err?.data?.message?.includes("REFERENCE constraint")) {
                                                    toast.error("❌ Cannot delete vehicle: existing bookings found");
                                                } else {
                                                    toast.error(err?.data?.message || "❌ Failed to delete vehicle");
                                                }
                                                }
                                            }}
                                            >
                                            Delete
                                            </button>



                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminDashboardLayout>
    );
};
 export default AllFeeds