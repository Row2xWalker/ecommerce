"use client"

import { AdminAddProduct, DashboardSideBar } from '@/components'
import React from 'react'
import { Table } from '@nextui-org/react';
const page = () => {
  return (
    <main className="grid grid-rows-1 grid-cols-6 bg-gray-100 h-screen w-screen">
        <aside className="col-span-1 bg-gray-600">
            <DashboardSideBar />
        </aside>
        <section className="col-span-5 bg-blue-100">
            <div className='flex items-center h-full bg-white'>
              <div className="h-5/6 bg-gray-200 w-full">
                <Table>
                  <Table.Header>
                    <Table.Column>PRODUCT NAME</Table.Column>
                    <Table.Column>IMAGE</Table.Column>
                    <Table.Column>DESCRIPTION</Table.Column>
                    <Table.Column>QTY</Table.Column>
                    <Table.Column>SOLD</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row key="1">
                      <Table.Cell>Tony Reichert</Table.Cell>
                      <Table.Cell>CEO</Table.Cell>
                      <Table.Cell>Active</Table.Cell>
                      <Table.Cell>4</Table.Cell>
                      <Table.Cell>4</Table.Cell>
                    </Table.Row>
                    <Table.Row key="2">
                      <Table.Cell>Zoey Lang</Table.Cell>
                      <Table.Cell>Technical Lead</Table.Cell>
                      <Table.Cell>Paused</Table.Cell>
                      <Table.Cell>4</Table.Cell>
                      <Table.Cell>4</Table.Cell>
                    </Table.Row>
                    <Table.Row key="3">
                      <Table.Cell>Jane Fisher</Table.Cell>
                      <Table.Cell>Senior Developer</Table.Cell>
                      <Table.Cell>Active</Table.Cell>
                      <Table.Cell>4</Table.Cell>
                      <Table.Cell>4</Table.Cell>
                    </Table.Row>
                    <Table.Row key="4">
                      <Table.Cell>William Howard</Table.Cell>
                      <Table.Cell>Community Manager</Table.Cell>
                      <Table.Cell>Vacation</Table.Cell>
                      <Table.Cell>4</Table.Cell>
                      <Table.Cell>4</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                
                <div>
                  <AdminAddProduct />
                </div>
              </div>
              
            </div>
        </section>
    </main>
  )
}

export default page