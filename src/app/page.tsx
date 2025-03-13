import BtcPrice from "@/components/Dashboard/BtcPrice";
import BtcChart from "@/components/Dashboard/BtcChart";
import BlocksInformations from "@/components/Dashboard/BlocksInformations";
import BtcPriceOriginal from "@/components/Dashboard/BtcPriceOriginal";

export default function Dashboard() {
    return (
        <div className='mt-10'>
            <div className='flex flex-row '>
                <BtcPrice/>
                <BtcPriceOriginal/>
                <BlocksInformations/>
            </div>
            <BtcChart/>
        </div>
    )
};