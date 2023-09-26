import React from 'react';

const Table = () => {
    // Assuming you have an array of contracts with a 'status' property
    const contracts = [
        {
            serialNo: '1001',
            name: 'Horizon Tech',
            value: '$48,292',
            status: 'Under Maintain',
            deadline: '01.01.2024',
        },
        {
            serialNo: '1002',
            name: 'Flowtech Labs',
            value: '$20,500',
            status: 'Out of Service',
            deadline: '-',
        },
    ];

    return (
        <div>
            <h4 className="heading-level-4 u-text-center">My Contracts</h4>
            <table className="table">
                <thead className="table-thead">
                    <tr className="table-row">
                        <th className="table-thead-col"><span className="eyebrow-heading-3">Serial No.</span></th>
                        <th className="table-thead-col">
                            <span className="eyebrow-heading-3">Name</span>
                        </th>
                        <th className="table-thead-col">
                            <span className="eyebrow-heading-3">Value</span>
                        </th>
                        <th className="table-thead-col">
                            <span className="eyebrow-heading-3">Status</span>
                        </th>
                        <th className="table-thead-col">
                            <span className="eyebrow-heading-3">Date</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="table-tbody">
                    {contracts.map((contract, index) => (
                        <tr key={index} className="table-row">
                            <td className="table-col" data-title="Serial No.">
                                <div className="u-inline-flex u-cross-center u-gap-12">
                                    <span className="text u-break-word u-line-height-1-5">{contract.serialNo}</span>
                                </div>
                            </td>
                            <td className="table-col" data-title="Name">
                                <div><span className="text">{contract.name}</span></div>
                            </td>
                            <td className="table-col" data-title="Value">
                                <span className="text">{contract.value}</span>
                            </td>
                            <td className={`table-col ${contract.status === 'Service' ? 'is-success' : (contract.status === 'under maintain' ? 'is-warning' : 'is-danger')}`} data-title="Status">
                                <div className={`tag ${contract.status === 'Service' ? 'is-success' : (contract.status === 'under maintain' ? 'is-warning' : 'is-danger')}`}>
                                    <span className="text">{contract.status}</span>
                                </div>
                            </td>
                            <td className="table-col" data-title="Deadline">
                                <span className="text">{contract.deadline}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
