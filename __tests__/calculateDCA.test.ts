
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
        const expectedPeriods = 52 * 2 + 1;
        const expectedTotalInvested = 50 * expectedPeriods;
        expect(results.totalInvested).toBe(expectedTotalInvested);
    });

});