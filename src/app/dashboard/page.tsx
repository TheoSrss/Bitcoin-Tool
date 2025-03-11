import BtcPrice from "@/components/Dashboard/BtcPrice";
import BtcChart from "@/components/Dashboard/BtcChart";
import BlocksInformations from "@/components/Dashboard/BlocksInformations";

export default function Dashboard() {
    return (
        <div>
            <h2>Here, you can find multiple informations of Bitcoin ecosystem</h2>
            <div className='flex flex-row'>
                <BtcPrice/>
                <BlocksInformations/>
            </div>
                <BtcChart/>
        </div>
    )
};