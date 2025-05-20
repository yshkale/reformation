/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ChangeEvent } from "react";
import {
  updateCustomerContact,
  updateCustomerDelivery,
} from "../../store/App/app.slice";

export const OrderForm = () => {
  const dispatch = useDispatch();
  const customerContact = useSelector(
    (state: any) => state.app.customerContact
  );
  const customerDelivery = useSelector(
    (state: any) => state.app.customerDelivery
  );

  // Handle contact form changes
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateCustomerContact({ email: e.target.value }));
  };

  const handleOffersChange = (checked: boolean) => {
    dispatch(updateCustomerContact({ receiveOffers: checked }));
  };

  // Handle delivery form changes
  const handleCountryChange = (value: string) => {
    dispatch(updateCustomerDelivery({ country: value }));
  };

  const handleDeliveryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateCustomerDelivery({ [name]: value }));
  };

  const handleSaveInfoChange = (checked: boolean) => {
    dispatch(updateCustomerDelivery({ saveInfo: checked }));
  };

  return (
    <form className="mx-4 my-6 text-sm space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Contact</h3>

        <div className="space-y-3">
          <Input
            placeholder="Email"
            className="placeholder:text-sm text-sm"
            value={customerContact.email}
            onChange={handleEmailChange}
            name="email"
            required
          />
          <div className="flex space-x-2 items-center">
            <Checkbox
              checked={customerContact.receiveOffers}
              onCheckedChange={handleOffersChange}
            />
            <p>Email me with news and offers</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Delivery</h3>

        <div className="pb-2 space-y-3">
          <Select
            required
            value={customerDelivery.country}
            onValueChange={handleCountryChange}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue
                placeholder="Country/Region"
                className="placeholder:text-xs"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="usa">USA</SelectItem>
                <SelectItem value="uk">UK</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            placeholder="First name"
            className="placeholder:text-sm text-sm"
            name="firstName"
            value={customerDelivery.firstName}
            onChange={handleDeliveryChange}
            required
          />
          <Input
            placeholder="Last name"
            className="placeholder:text-sm text-sm"
            name="lastName"
            value={customerDelivery.lastName}
            onChange={handleDeliveryChange}
          />
          <Input
            placeholder="Address"
            className="placeholder:text-sm text-sm"
            name="address"
            value={customerDelivery.address}
            onChange={handleDeliveryChange}
            required
          />
          <Input
            placeholder="City"
            className="placeholder:text-sm text-sm"
            name="city"
            value={customerDelivery.city}
            onChange={handleDeliveryChange}
            required
          />
          <Input
            placeholder="State"
            className="placeholder:text-sm text-sm"
            name="state"
            value={customerDelivery.state}
            onChange={handleDeliveryChange}
            required
          />
          <Input
            placeholder="PIN Code"
            className="placeholder:text-sm text-sm"
            name="pinCode"
            value={customerDelivery.pinCode}
            onChange={handleDeliveryChange}
            required
          />
          <Input
            placeholder="Phone"
            className="placeholder:text-sm text-sm"
            name="phone"
            value={customerDelivery.phone}
            onChange={handleDeliveryChange}
            required
          />

          <div className="flex space-x-2 items-center">
            <Checkbox
              checked={customerDelivery.saveInfo}
              onCheckedChange={handleSaveInfoChange}
              required
            />
            <p>Save this information for next time</p>
          </div>
        </div>
      </div>
    </form>
  );
};
