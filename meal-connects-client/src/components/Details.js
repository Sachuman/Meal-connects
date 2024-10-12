import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Details() {
  const [formData, setFormData] = useState({
    orgName: '',
    orgType: '',
    peopleServed: '',
    address: '',
    contactPerson: '',
    phoneNumber: '',
    email: ''
  })
  const navigate = useNavigate() // Initialize navigation hook



  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    // For this example, we'll store it in localStorage
    const existingOrgs = JSON.parse(localStorage.getItem('organizations') || '[]')
    const newOrg = {
      id: Date.now(), // Use timestamp as a simple unique id
      name: formData.orgName,
      type: formData.orgType,
      peopleServed: parseInt(formData.peopleServed),
      address: formData.address
    }
    const updatedOrgs = [...existingOrgs, newOrg]
    localStorage.setItem('organizations', JSON.stringify(updatedOrgs))
    
    navigate('/display') // Add redirection here
   

  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold mb-2">Register Your Organization</h1>
          <p className="text-gray-600 mb-4">Please provide details about your organization</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">Organization Name</label>
              <input
                id="orgName"
                name="orgName"
                type="text"
                value={formData.orgName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="orgType" className="block text-sm font-medium text-gray-700">Organization Type</label>
              <select
                id="orgType"
                name="orgType"
                value={formData.orgType}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select organization type</option>
                <option value="shelter">Shelter</option>
                <option value="restaurant">Restaurant</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="peopleServed" className="block text-sm font-medium text-gray-700">Number of People Served</label>
              <input
                id="peopleServed"
                name="peopleServed"
                type="number"
                value={formData.peopleServed}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
              <input
                id="contactPerson"
                name="contactPerson"
                type="text"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Submit Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}