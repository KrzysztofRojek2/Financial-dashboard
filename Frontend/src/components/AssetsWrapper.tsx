import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AssetItem from "./AssetItem";
import Button from "./Button";
import Modal from "./Modal";
import InputField from "./InputField";
import { SketchPicker } from "react-color";
import { useState } from "react";
import { useAssetData, useAddAsset } from "../api/assets";
import { toast } from "react-toastify";

const AssetsWrapper = () => {
  const { data: assets, isLoading, error, refetch } = useAssetData();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCost, setNewCost] = useState("");
  const [newColor, setNewColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { mutate: addAssetMutate } = useAddAsset();

  const handleAddAsset = () => {
    if (newName && newCost && newColor) {
      addAssetMutate(
        { name: newName, cost: parseFloat(newCost), color: newColor },
        {
          onSuccess: () => {
            setAddModalOpen(false);
            setNewName("");
            setNewCost("");
            setNewColor("#ffffff");
            refetch();
            toast.success("Asset added succesfully!");
          },
        }
      );
    } else {
      toast.warn("Please fill in all fields!");
    }
  };
  
  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>Wystąpił błąd podczas pobierania danych.</div>;
  }

  return (
    <div className="div-primary p-6 md:p-10 gap-5 mb-64">
      {(assets ?? []).length > 0 ? (
        assets!.map((asset) => (
          <AssetItem
            key={asset.id}
            id={asset.id}
            assetName={asset.name}
            cost={asset.cost}
            color={asset.color}
          />
        ))
      ) : (
        <p>Brak assetów.</p>
      )}

      <Button variant="secondary" style="hover:text-blue-500 self-end" onClick={() => setAddModalOpen(true)}>
        <FontAwesomeIcon size="2x" icon={faPlus} />
      </Button>
      <Modal
        isOpen={isAddModalOpen}
        title="Add New Asset"
        onClose={() => setAddModalOpen(false)}
        onConfirm={handleAddAsset}
        confirmText="Add Asset"
      >
        <div className="flex flex-col items-center gap-4">
          <InputField
            label="Asset Name"
            id="new-asset-name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <InputField
            label="Cost"
            id="new-asset-cost"
            type="number"
            value={newCost}
            onChange={(e) => setNewCost(e.target.value)}
          />
          <div className="flex flex-col relative">
            <label className="pl-2 text-sm">Color</label>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg border border-white" style={{ backgroundColor: newColor }}></div>
              <Button variant="secondary" onClick={() => setShowColorPicker(!showColorPicker)}>
                Pick Color
              </Button>
            </div>
            {showColorPicker && (
              <div className="absolute -top-72 left-0 z-10 bg-black p-2 shadow-lg rounded-lg">
                <SketchPicker
                  color={newColor}
                  onChange={(color) => setNewColor(color.hex)}
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AssetsWrapper;
