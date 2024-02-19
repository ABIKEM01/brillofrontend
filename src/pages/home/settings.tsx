import React from 'react'
import HomeLayout from '../../components/layout/HomeLayout.tsx'

function Settings() {
  return (

    <HomeLayout>
                <main className="px-4  md:px:20 pt-10">
          <div className="mx-auto space-y-16 sm:space-y-20 lg:mx-0">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Username</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">Abikem</div>
                    <button type="button" className="font-semibold text-red-600 hover:text-red-500">
                      Update
                    </button>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">babayod@yahoo.com</div>
                    <button type="button" className="font-semibold text-red-600 hover:text-red-500">
                      Update
                    </button>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Phone</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">08069424477</div>
                    <button type="button" className="font-semibold text-red-600 hover:text-red-500">
                      Update
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </main>
    </HomeLayout>
  )
}

export default Settings