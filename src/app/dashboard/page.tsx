import BtcPrice from "@/components/Dashboard/BtcPrice";
import BtcChart from "@/components/Dashboard/BtcChart";

export default function Dashboard() {
    return (
        <div>
            <h2>Here, you can find multiple informations of Bitcoin ecosystem</h2>
                <BtcPrice/>
                <BtcChart/>
        </div>
    )
};