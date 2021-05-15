import React, { useState, useEffect } from 'react';
import { RequestModel } from '../../objectModel/RequestModel';
import RequestService from '../../services/RequestService';
import { useHistory } from 'react-router-dom';

const RequestListComponent = () => {
  const [requests, setRequests] = useState([] as RequestModel[]);
  const [requestCount, setRequestCount] = useState(0);
  const history = useHistory();
  // forceUpdateCount used to update key of table row
  // If key is not changed, even though value of input field changes, React only refreshes
  // new rows or reduces number of rows, but does not update 
  const [forceUpdateCount, setForceUpdateCount] = useState(0);

  useEffect(() => {
    async function getData() {
      const requests = await RequestService.list();
      setRequests(requests);
      setRequestCount(requests.length);
    }
    getData();
  }, []);

  let RequestLinks = {};
  console.log('requests for links', requests);
  RequestLinks = requests.map((request, i) => {
    console.log("Name", request.requestorName);
    return (
      <tr key={`item-${request.requestorName}-${i}=${forceUpdateCount}`}>
        <td>{request.requestorName}</td>
        <td>{request.address}</td>
        <td>{request.phone}</td>
        <td>{request.programCode}</td>
        <td>{request.email}</td>
        <td>
          <button onClick={e => deleteArrayRow(i)}>Delete</button>
        </td>
      </tr>
    );
  });

  function addRequest() {
    history.push('/request/create');
  }

  function deleteArrayRow(i: number) {
    requests.splice(i, 1);
    setRequests(requests);
    setRequestCount(requests.length);
    setForceUpdateCount(forceUpdateCount + 1);
  }

  return (
    <div>
      <p>Count: {requestCount}</p>
      <button onClick={addRequest}>Add</button>
      <table className="">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Program</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{RequestLinks}</tbody>
      </table>
      <hr />
      <br />
    </div>
  );
};

export default RequestListComponent;
