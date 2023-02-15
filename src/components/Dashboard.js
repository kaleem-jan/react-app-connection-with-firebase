import React from 'react'
import DashboardSidebar from './DashboardSidebar'
import RegisteredClients from './RegisteredClients'

const Dashboard = () => {
  
  return (
    <>
    <div className="row">
      

      <div className="col-2 dashboard-sidebar">
        <DashboardSidebar/>
      </div>
      <div className="col-8">
      <RegisteredClients />
      </div>
    </div>
    
    </>
  )
}

export default Dashboard
 