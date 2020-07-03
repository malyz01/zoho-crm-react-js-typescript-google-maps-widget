import React from 'react'

import { UnprocessedResultsFromCRM } from '../types'

type ResultsTableProps = {
    results: UnprocessedResultsFromCRM[]
}

export function ResultsTableWidget (props: ResultsTableProps) {
    // ignore the first row because it has the info for the search address
    const resultsAfterSearchAddress = props.results
    return (
        <div style={{ padding: '20px' }}>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Property Address</th>
                        <th>Owner</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {resultsAfterSearchAddress.map((result, index) => {
                        let propertyAddress = result.Deal_Name
                        if (!result.Latitude || !result.Longitude) {
                            propertyAddress = `${result.Deal_Name} - Geocordinates N/A, cannot display on map.`
                        }

                        const ownerData = result.owner_details.find((owner) => owner.Contact_Type === 'Owner')
                        const contactData = result.owner_details.find((owner) => owner.Contact_Type === 'Director')
                        return (
                            <tr key={result.id}>
                                <td>{index + 1}</td>
                                <td>{propertyAddress}</td>
                                <td>{ownerData?.Name || ''}</td>
                                <td>{contactData?.Name || 'contact is not found'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
