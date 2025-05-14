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

export const OrderForm = () => {
  return (
    <form className="mx-4 my-6 text-sm space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Contact</h3>

        <div className="space-y-3">
          <Input placeholder="Email" className="placeholder:text-sm text-sm" />
          <div className="flex space-x-2 items-center">
            <Checkbox />
            <p>Email me with news and offers</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Delivery</h3>

        <div className="pb-2 space-y-3">
          <Select required>
            <SelectTrigger className="w-full text-sm">
              <SelectValue
                placeholder="Country/Region"
                className="placeholder:text-xs"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="india">India</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            placeholder="First name"
            className="placeholder:text-sm text-sm"
            required
          />
          <Input
            placeholder="Last name"
            className="placeholder:text-sm text-sm"
          />
          <Input
            placeholder="Address"
            className="placeholder:text-sm text-sm"
            required
          />
          <Input
            placeholder="City"
            className="placeholder:text-sm text-sm"
            required
          />
          <Input
            placeholder="State"
            className="placeholder:text-sm text-sm"
            required
          />
          <Input
            placeholder="PIN Code"
            className="placeholder:text-sm text-sm"
            required
          />
          <Input
            placeholder="Phone"
            className="placeholder:text-sm text-sm"
            required
          />

          <div className="flex space-x-2 items-center">
            <Checkbox required />
            <p>Save this information for next time</p>
          </div>
        </div>
      </div>
    </form>
  );
};
