import React from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  formClassName = "",
  inputClassName = "",
  selectClassName = "",
  textareaClassName = "",
  buttonClassName = "",
  labelClassName = "",
}) => {
  const renderInputsByComponentType = (getControlItem) => {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            className={`w-full p-2 sm:p-3 rounded-md border border-gray-300 ${inputClassName}`}
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({ ...formData, [getControlItem.name]: event.target.value })
            }
          />
        );
      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [getControlItem.name]: value })
            }
            value={value}
            className={selectClassName}
          >
            <SelectTrigger className={`w-full p-2 sm:p-3 rounded-md border border-gray-300 ${inputClassName}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-md">
              {getControlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            className={`w-full p-2 sm:p-3 rounded-md border border-gray-300 ${textareaClassName}`}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({ ...formData, [getControlItem.name]: event.target.value })
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${formClassName}`}>
      {formControls.map((controlItem) => (
        <div className="grid w-full gap-1.5" key={controlItem.name}>
          <Label className={`text-sm sm:text-base ${labelClassName}`}>
            {controlItem.logo && <span className="text-lg">{controlItem.logo}</span>}
            {controlItem.label}
          </Label>
          {renderInputsByComponentType(controlItem)}
        </div>
      ))}
      <Button
        disabled={isBtnDisabled}
        type="submit"
        className={`w-full sm:w-auto px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 ${
          isBtnDisabled ? "opacity-50 cursor-not-allowed" : ""
        } ${buttonClassName}`}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;