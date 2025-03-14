import BtcPrice from "@/components/Dashboard/BtcPrice";
import BtcChart from "@/components/Dashboard/BtcChart";

export default function Dashboard() {
    return (
        <div className='mt-10'>
            <div className='flex flex-row '>
                <BtcPrice/>
            </div>
            <BtcChart/>
        </div>
    )
};