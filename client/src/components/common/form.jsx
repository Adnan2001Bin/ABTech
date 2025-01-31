import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
  formClassName = "", // Custom class for the form container
  inputClassName = "", // Custom class for input fields
  selectClassName = "",
  textareaClassName = "",
  buttonClassName = "", // Custom class for the submit button
  labelClassName = "", // Custom class for labels
}) => {
  const renderInputsByComponentType = (getControlItem) => {
    let element = null;

    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            className={`bg-transparent outline-none border-none mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full ${inputClassName}`}
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
            className={selectClassName}
          >
            <SelectTrigger
              className={`border-2 border-slate-400 rounded-md p-2 ${inputClassName}`}
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="absolute z-50 max-h-60 overflow-y-auto bg-white shadow-lg border border-gray-300 rounded-md">
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${textareaClassName}`}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className={inputClassName}
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit} className={formClassName}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className={`mb-1 flex items-center gap-2 ${labelClassName}`}>
              {controlItem.logo && (
                <span className="text-lg">{controlItem.logo}</span>
              )}
              {controlItem.label}
            </Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        disabled={isBtnDisabled}
        type="submit"
        className={`${
      isBtnDisabled ? "opacity-50 cursor-not-allowed" : ""
    } ${buttonClassName}`}
        style={{
          transformOrigin: "center",
        }}
      >
        <span className="block transform-gpu transition-transform duration-300">
          {buttonText || "Submit"}
        </span>
      </Button>
    </form>
  );
};

export default CommonForm;
