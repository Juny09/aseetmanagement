import type { NextPage } from 'next'
import { useState,useEffect } from 'react'
import { prisma } from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useForm } from '../statusformmulti1/hook'; // Import the useForm hook from your form library


interface FormData {
    id: string;
    mstatus: string;
    category: string;
    from: string;
    to: string;
    performby: string;
    attach: string;
    estimateddate: string;
    warrantyinfo: string;
    comment: string;
    partId: string; // Add partId property here
  }
  
  // Array interface
  interface Status {
    status: {
    id:string
    mstatus: string
    category: string
    from: string
    to:string
    performby: string
    attach: string
    estimateddate: string
    warrantyinfo: string
    comment: string
    partId: string
    }[]
  }
  
  // Load mstatus from getServerSideProps server side rendering
  const Home: NextPage<Status> = ({ status }) => {
    const [form, setForm] = useState<FormData>({
    id:'', 
    mstatus:'',
    category:'', 
    from:'', 
    to:'', 
    performby:'', 
    attach:'', 
    estimateddate:'', 
    warrantyinfo:'', 
    comment:'',
    partId:'',})

    const [newStatus, setNewStatus] = useState<Boolean>(true)
    const router = useRouter()
  
    const refreshData = () => {
      router.replace(router.asPath)
    }

  async function handleSubmit(data: FormData) {
    try {
      if (newStatus) {
        if (data.mstatus) {
          // CREATE
          fetch('api/statuscreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }).then(() => {
            setForm({
              id:'', 
              mstatus:'',
              category:'', 
              from:'', 
              to:'', 
              performby:'', 
              attach:'', 
              estimateddate:'', 
              warrantyinfo:'', 
              comment:'',
              partId:'',});
            refreshData();
            router.push('/statusdash'); // Redirect to the dashboard page
          });
        } else {
          alert("Status can not be blank");
        }
      } else {
        // UPDATE
        fetch(`api/status/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT'
        }).then(() => {
          setForm({ 
            id:'', 
            mstatus:'', 
            category:'', 
            from:'', 
            to:'', 
            performby:'', 
            attach:'', 
            estimateddate:'', 
            warrantyinfo:'', 
            comment:'' ,
            partId:'',});
          setNewStatus(true);
          refreshData();
          router.push('/statusformmulticopy'); // Redirect to the dashboard page
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
    
  
    async function updateStatus(
      id: string,
      mstatus: string,
      category: string,
      from: string,
      to:string,
      performby: string,
      attach: string,
      estimateddate: string,
      warrantyinfo: string,
      comment: string,
      partId: string,
    ) {
      console.log("updateMstatus called"); // Add this line
      setForm({ 
        id, 
        mstatus, 
        category, 
        from, 
        to,    
        performby, 
        attach, 
        estimateddate, 
        warrantyinfo, 
        comment,
        partId });
      setNewStatus(false);
    }
    
  
    async function deleteStatus(id: string) {
      try {
        fetch(`api/status/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE'
        }).then(() => {
          refreshData()
        })
      } catch (error) {
        console.log(error)
      }    
    }
  
    function handleCancel() {
      setForm({
      id:'',
      mstatus:'', 
      category:'', 
      from:'', 
      to:'', 
      performby:'', 
      attach:'', 
      estimateddate:'', 
      warrantyinfo:'', 
      comment:'', 
      partId:'',})
      setNewStatus(true)
    }

    useEffect(() => {
    //table
    const filterTableFunc = () => {
      const filterResult = (document.getElementById("search") as HTMLInputElement).value.toLowerCase();
      const Table = document.getElementById("Data");
      if (Table) {
        const tr = Table.getElementsByTagName("tr");
        for (let i = 1; i < tr.length; i++) {
          const rowStyle = tr[i].style;
          if (rowStyle) {
            rowStyle.display = "none";
            const tdArray = tr[i].getElementsByTagName("td");
            for (let j = 0; j < tdArray.length; j++) {
              const tdText = tdArray[j].textContent;
              if (tdText && tdText.toLowerCase().indexOf(filterResult) > -1) {
                rowStyle.display = "";
                break;
              }
            }
          }
        }
      }
    };
 // Call the filtering function when the search input changes
 const searchInput = document.getElementById("search") as HTMLInputElement | null;
 if (searchInput) {
   searchInput.addEventListener("input", filterTableFunc);
 }

 // Clean up the event listener when the component unmounts
 return () => {
   if (searchInput) {
     searchInput.removeEventListener("input", filterTableFunc);
   }
 };
}, []);
    //sort function
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.kryogenix.org/code/browser/sorttable/sorttable.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
        document.body.removeChild(script);
        };
    }, []);

    return(
      <div className="flex flex-col">
        <div className="container text-white">
        <div className="row">
          <div className="col-sm">
            One of three columns
          </div>
          <div className="col-sm">
            One of three columns
          </div>
          <div className="col-sm">
            One of three columns
          </div>
        </div>
      </div>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="text"
            id="search"
            className="block p-2 pl-10 text-sm text-gray-900 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:border-0 outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"/>
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="sortable min-w-full text-center text-sm font-light">
                <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                  <tr>
                    <th scope="col" className="px-1 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      From 
                    </th>
                    <th scope="col" className="px-6 py-3">
                      To
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Perform By
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Attach
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Estimated date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Part
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Warrenty Info
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Comment
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                    {status.map((status, index) => (
                    <tr key={status.id} className="border-b dark:border-neutral-500">
                        <td className="px-6 py-1 font-medium text-white">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{status.mstatus}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{status.category}</td>
                        <td className="whitespace-nowrap px-6 py-3 text-white">{status.from}</td>
                        <td className="whitespace-nowrap px-6 py-3 text-white">{status.to}</td>
                        <td className="whitespace-nowrap px-6 py-3 text-white">{status.performby}</td>
                        <td className="whitespace-nowrap px-6 py-3 text-white">{status.attach}</td>
                        <td className="whitespace-nowrap px-6 py-3 text-white">{status.estimateddate}</td>
                        <td className="whitespace-nowrap px-6 py-3 text-white">{status.partId}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{status.warrantyinfo}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{status.comment}</td>
                        <td className="flex justify-center space-x-1 whitespace-nowrap px-6 py-4">
                          <button className="bg-blue-500 px-4 text-white rounded">
                            Edit
                          </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <br/>
          </div>
        </div>
      </div>
    </div>
    )
  }

  export const getServerSideProps: GetServerSideProps = async () => {
    // READ all mstatus from DB
    const statuss = await prisma?.status.findMany({
      select: {
        id: true,
        mstatus: true,
        category: true,
        from: true,
        to: true,
        performby: true,
        attach: true,
        estimateddate: true,
        warrantyinfo: true,
        comment: true,
        partId: true,
      },
    });
  
    const parts = await prisma?.part.findMany({
      select: {
        name: true,
        idp: true,
        id: true,
        quantity: true,
        description: true,
        // Exclude createdAt and other non-serializable fields here
      },
    });
  
    return {
      props: {
        parts: parts || [],
        status: statuss || [], // Pass statuss as a prop
      },
    };
  };
  
  
  export default Home;
  
  