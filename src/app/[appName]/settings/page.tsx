"use client";

import { useGetStore } from "<root>/app/api/hooks/store/useGetStore";
import CreateStoreForm from "<root>/app/components/product/CreateStoreForm/CreateStoreForm";


const Settings = () => {

    const { isSuccess } = useGetStore();

    return <div>

        {isSuccess && <CreateStoreForm />}

    </div>

}

export default Settings;