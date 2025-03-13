import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import data from "../../../public/data/faq.json";

type Question = {
    question: string; answer: string;
}
type Category = {
    category: string; questions: Question[];
}
export default function faq() {
    return (<div className="w-4/5 m-auto my-15 sm:my-30 ">
        <h1 className="text-2xl font-bold mb-10">Frequently Asked <span className='text-orange-400'>Questions</span>
        </h1>
        <span className="relative inline-block font-bold text-lg pt-2 pl-5 mb-8 sm:mb-1 -z-1">
            <span
                className="absolute -z-10 inset-0 bg-orange-300 opacity-50 blur-lg rounded-full w-[110%] h-[110%] -left-2 top-1"></span>

                You have a question? We have an <span className="text-orange-400">answer</span>
        </span>

        <div className='flex flex-col sm:flex-row flex-wrap'>
            {data.map((category: Category, index: number) => (
                <div key={index} className="w-full lg:w-1/3 md:1/2 sm:p-12">
                    <h1 className="text-xl font-bold my-2">{category.category} questions</h1>
                    <Accordion type="single" collapsible className="w-full ">
                        {category.questions.map((question: Question, index: number) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className='cursor-pointer'>{question.question}</AccordionTrigger>
                                <AccordionContent className='pr-4'>
                                    {question.answer}
                                </AccordionContent>
                            </AccordionItem>))}
                    </Accordion>
                </div>))}
        </div>
    </div>)
};