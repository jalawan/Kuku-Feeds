import { useState } from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { toast, Toaster } from 'sonner'
import { useAddfeedMutation, useGetAllfeedsQuery } from '../../Features/api/FeedApi'
import { Link ,useNavigate } from 'react-router'

const AddFeed = () => {
  const { data: descr = [] } = useGetAllfeedsQuery()
  const [addFeed] = useAddfeedMutation()

  const [feedId, setFeedId] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] =useState('')
  const navigate=useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await addFeed({
        feed_desc_id: Number(feedId),
        price: Number(price),
        stock:Number(stock),
        is_active: true
      } as any).unwrap()

      toast.success('Feed Created Successfully')

      setFeedId('')
      setPrice('')
      setStock('')
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
        {descr.length === 0 ? (
            <option disabled>Loading descs...</option>
        ) : (
            descr.map((desc: any) => (
            <option key={desc.feed_id} value={desc.feed_id}>
                {desc.manufacturer} {desc.model} ({desc.year})
            </option>
            ))
        )}
        </select>


        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Rental Rate Per Day"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setStock(e.target.value)}
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
