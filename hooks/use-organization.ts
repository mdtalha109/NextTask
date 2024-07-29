import { setOrganizations, setSelectedOrganization } from "@/redux/slice/organizationSlice";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const useOrganization = () => {

    const params = useParams();
    const dispatch = useDispatch();


    let orgId = params.organizationId as string;

    const { organizations, selectedOrganization } = useSelector((state: RootState) => state.organization);
    const [loading, setLoading] = useState(true);

    const selectOrganization = (organizationId: string) => {
      organizations.forEach((org) => {
        if(org.id == organizationId){
          dispatch(setSelectedOrganization(org));
          return;
        }
      })
      
    }

    const fetchOrganizations = async () => {
      try {
        const response = await fetch('/api/organization/get-organization');
        const data = await response.json();
        
        if (response.ok) {
          dispatch(setOrganizations(data.organizations));
        }
      } catch (error) {
        console.error('Failed to fetch organizations:', error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        
        
        if (organizations.length === 0) {
          fetchOrganizations();
        } else {
          setLoading(false);
        }
      }, [dispatch, organizations.length]);

      useEffect(() => {
        if (orgId && organizations.length > 0) {
          const org = organizations.find(org => org.id === orgId);
          if (org) {
            dispatch(setSelectedOrganization(org));
          }
        }
      }, [orgId, organizations, dispatch]);


    return { organizations, selectedOrganization, fetchOrganizations, selectOrganization, loading }

    

};