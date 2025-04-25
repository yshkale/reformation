import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const FooterAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full text-white pt-0">
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline">
          COMPANY
        </AccordionTrigger>
        <AccordionContent className="flex flex-col space-y-2 text-xs">
          <p>Our Story</p>
          <p>Careers</p>
          <p>Press</p>
          <p>Influencers</p>
          <p>Find a Store</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="hover:no-underline">
          RESOURCES
        </AccordionTrigger>
        <AccordionContent className="flex flex-col space-y-2 text-xs">
          <p>Wholesale</p>
          <p>Become a Retailer</p>
          <p>Corporate Orders</p>
          <p>Store Locator</p>
          <p>Affiliates</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="hover:no-underline">
          SUPPORT
        </AccordionTrigger>
        <AccordionContent className="flex flex-col space-y-2 text-xs">
          <p>Contact Us</p>
          <p>Delivery</p>
          <p>Shipping & Returns</p>
          <p>My Account</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
