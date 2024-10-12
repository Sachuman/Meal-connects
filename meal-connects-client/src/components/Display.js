import React, { useState, useEffect } from 'react'

export default function Display() {
  const [organizations, setOrganizations] = useState([])

  useEffect(() => {
    const storedOrgs = JSON.parse(localStorage.getItem('organizations') || '[]')
    setOrganizations(storedOrgs)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Registered Organizations</h1>
      {organizations.length === 0 ? (
        <p className="text-center text-gray-600">No organizations registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <div key={org.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2 text-blue-600">{org.name}</h2>
                <p className="text-gray-600 mb-4 italic">{org.type.charAt(0).toUpperCase() + org.type.slice(1)}</p>
                <div className="space-y-2">
                  <p className="text-gray-700"><span className="font-semibold">People Served:</span> {org.peopleServed}</p>
                  <p className="text-gray-700"><span className="font-semibold">Address:</span> {org.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}