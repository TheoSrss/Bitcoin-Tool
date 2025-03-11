import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type DCASettings = {
    investAmount: number;
    frequency: "week" | "month" | "year";
    duration: number;
};

interface DCAFormProps {
    settings: DCASettings;
    setSettings: (settings: DCASettings) => void;
}

export default function DCAForm({ settings, setSettings }: DCAFormProps) {
    return (
        <Card className=" max-w-4xl mx-auto p-6 min-w-1/3">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Dollar Cost Averaging (DCA) Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">

                    {/* Invest Amount */}
                    <div className="flex flex-col w-full md:w-1/3">
                        <Label htmlFor="investAmount" className="mb-2 text-sm">Amount ($)</Label>
                        <Input
                            id="investAmount"
                            type="number"
                            min={1}
                            className="h-12 w-full"
                            value={settings.investAmount}
                            onChange={(e) =>
                                setSettings({ ...settings, investAmount: Math.max(1, Number(e.target.value)) })
                            }
                        />
                    </div>


                    {/* Frequency */}
                    <div className="flex flex-col w-full md:w-1/3">
                        <Label htmlFor="frequency" className="mb-2 text-sm">Frequency</Label>
                        <Select
                            value={settings.frequency}
                            onValueChange={(value) => setSettings({ ...settings, frequency: value as DCASettings["frequency"] })}
                        >
                            <SelectTrigger className="h-12 w-full">
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="week">Every Week</SelectItem>
                                <SelectItem value="month">Every Month</SelectItem>
                                <SelectItem value="year">Every Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col w-full md:w-1/3">
                        <Label htmlFor="duration" className="mb-2 text-sm">Duration (years)</Label>
                        <Input
                            id="duration"
                            type="number"
                            min={1}
                            max={10} // Limite à 10 ans
                            className="h-12 w-full"
                            value={settings.duration}
                            onChange={(e) =>
                                setSettings({ ...settings, duration: Math.min(10, Math.max(1, Number(e.target.value))) })
                            }
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}