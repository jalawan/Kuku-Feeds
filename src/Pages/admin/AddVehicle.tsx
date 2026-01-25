import { useState } from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { toast, Toaster } from 'sonner'
import { useAddfeedMutation, useGetAllFeedsQuery } from '../../features/api/FeedApi'
import { Link ,useNavigate } from 'react-router'

const AddFeed = () => {
  const { data: specs = [] } = useGetAllFeedsQuery()
  const [addFeed] = useAddfeedMutation()

  const [feedId, setFeedId] = useState('')
  const [rentalRate, setRentalRate] = useState('')
  const navigate=useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await addFeed({
        feed_spec_id: Number(feedId),
        rental_rate: Number(rentalRate),
        availability: true
      } as any).unwrap()

      toast.success('Feed Created Successfully')

      setFeedId('')
      setRentalRate('')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create feed')
    }
  }

  return (
    <AdminDashboardLayout>
        <Toaster richColors/>
      <h1 className="text-2xl font-bold mb-4">Add New Feed</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">

        <select
        value={feedId}
        onChange={(e) => setFeedId(e.target.value)}
        className="select select-bordered w-full"
        required
        ><Link to ="/admin/Feed">
        <option value="">Select Feed ification <br></br>Click here to Add ification
          </option></Link>
        {specs.length === 0 ? (
            <option disabled>Loading specs...</option>
        ) : (
            specs.map((spec: any) => (
            <option key={spec.feed_id} value={spec.feed_id}>
                {spec.manufacturer} {spec.model} ({spec.year})
            </option>
            ))
        )}
        </select>


        <input
          type="number"
          value={rentalRate}
          onChange={(e) => setRentalRate(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Rental Rate Per Day"
          required
        />

        <button className="btn bg-black text-gold w-full">Save Feed</button>
      </form>
    </AdminDashboardLayout>
  )
}

export default AddFeed
