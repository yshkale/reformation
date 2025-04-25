import {
  ArrowRightCircle,
  Facebook,
  InstagramIcon,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { FooterAccordion } from "./footer-accordion";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

export const Footer = () => {
  return (
    <section className="bg-neutral-900 px-3 py-10 space-y-10 text-white">
      <Image
        src="/footer-logo.webp"
        alt="footer logo"
        width={200}
        height={200}
        quality={100}
      />

      <div className="flex space-x-6">
        <Facebook className="text-white" strokeWidth={1.5} size={18} />
        <Twitter className="text-white" strokeWidth={1.5} size={18} />
        <InstagramIcon className="text-white" strokeWidth={1.5} size={18} />
        <Linkedin className="text-white" strokeWidth={1.5} size={18} />
      </div>

      <p className="text-white text-lg">
        8212 E. Glen Creek Street Orchard Park, NY 14127, United States of
        America
      </p>

      <FooterAccordion />

      <div className="flex flex-col gap-5">
        <div className="space-y-2">
          <p className="uppercase text-sm tracking-widest">Newsletter</p>
          <p className="text-xs">
            Sign up for our newsletter and receive 10% off your first order!
          </p>
        </div>

        <div className="flex space-x-2 items-center">
          <Input
            className="rounded-none text-white placeholder:text-white placeholder:text-xs"
            placeholder="Email"
          />
          <ArrowRightCircle size={40} strokeWidth={1} />
        </div>

        <div className="flex items-center space-x-2 -mt-3.5">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-xs text-neutral-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to receiving marketing emails and special deals
          </label>
        </div>
      </div>

      <div className="flex space-x-4">
        <Image
          src={"/icons/visa.svg"}
          alt="payment icon"
          width={30}
          height={30}
        />
        <Image
          src={"/icons/mastercard.svg"}
          alt="payment icon"
          width={25}
          height={25}
        />
        <Image
          src={"/icons/american-express.svg"}
          alt="payment icon"
          width={25}
          height={25}
        />
        <Image
          src={"/icons/paypal.svg"}
          alt="payment icon"
          width={25}
          height={25}
        />
        <Image
          src={"/icons/discover.svg"}
          alt="payment icon"
          width={30}
          height={30}
        />
      </div>

      <p className="text-xs">
        &copy; 2025 Reformation, All rights reserved. <br /> Designed and built
        by &nbsp;
        <Link
          href="https://github.com/yshkale"
          target="_blank"
          className="border-b border-neutral-300"
        >
          @yshkale
        </Link>
      </p>
    </section>
  );
};
