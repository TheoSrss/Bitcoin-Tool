
import { calculateDCA, DCAResults } from "@/lib/calculateDCA";
import { DCASettings } from "@/components/Dca/DCAForm";

describe("calculateDCA", () => {
    it("should compute totalInvested correctly for weekly frequency", () => {
        const settings: DCASettings = {
            investAmount: 50,
            frequency: "week",
            duration: 2,
        };

        const results: DCAResults = calculateDCA(settings);
        console.log(results)
        console.log(results.history[results.history.length - 1])
        // const expectedPeriods = 52 * 2; // 52 semaines par an * 2 ans
        // const expectedTotalInvested = 50 * expectedPeriods;
        // expect(results.totalInvested).toBe(expectedTotalInvested);
    });

});