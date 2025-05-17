"use client";
import { useEffect, useState } from 'react';
import {
  Table, Button,
  Flex,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Heading
} from "@aws-amplify/ui-react";
import type { Schema } from "../../amplify/data/resource";

const [jobRenewals, setTodos] = useState<Array<Schema["JobRenewals"]["type"]>>([]);

export default function RenewalsTable(){
    return <>
    <Flex id ="Renewals"  >
       <Heading  level={1} >Job Renewals</Heading>
      <Table>
          <TableRow>
            <TableHead>Job ID</TableHead>
            <TableHead>Date of Renewal</TableHead>
            <TableHead>Renewal Period</TableHead>
            <TableHead>New Client Pricing</TableHead>
            <TableHead>New Candidate Pricing</TableHead>
            <TableHead>New Hours</TableHead>
          </TableRow>
        
        <TableBody>
          {jobRenewals.map((renewal) => (

            <TableRow key={renewal.id}>
              <TableCell>{renewal.job_id}</TableCell>
              <TableCell>{renewal.date_of_renewal}</TableCell>
              <TableCell>{renewal.renewal_period}</TableCell>              
              <TableCell>{renewal.new_client_pricing}</TableCell>
              <TableCell>{renewal.new_candidate_pricing}</TableCell>
              <TableCell>{renewal.new_hours}</TableCell>

              <TableCell>
                {/* <Button onClick={() => updateRenewals(renewal.id)}>Update first</Button> */}
              </TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
      </Flex>
    </>
}
