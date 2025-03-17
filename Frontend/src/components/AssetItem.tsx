import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { SketchPicker } from "react-color";
import Button from "./Button";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import InputField from "./InputField";
import { useUpdateAsset, useDeleteAsset, useAssetData } from "../api/assets";
import { toast } from "react-toastify";

interface AssetItemProps {
  id: number;
  assetName: string;
  cost: number;
  color: string;
}

const AssetItem: React.FC<AssetItemProps> = ({ id, assetName, cost, color }) => {
  const [selectedColor, setSelectedColor] = useState(color);
  const [showPicker, setShowPicker] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(assetName);
  const [editedCost, setEditedCost] = useState(cost);
  const { refetch } = useAssetData();

  const { mutate: updateAsset } = useUpdateAsset();
  const { mutate: deleteAsset } = useDeleteAsset();

  useEffect(() => {
    console.log("Current color:", selectedColor);
  }, [selectedColor]);

  const handleSave = () => {
    updateAsset(
      { id, name: editedName, cost: editedCost, color: selectedColor },
      {
        onSuccess: () => {
          toast.success("Asset updated successfully!")
          refetch();
        },
        onError: () => {
          toast.error("Error updating Asset!")
        },
      }
    );

    setEditModalOpen(false);
  };

  const handleDelete = () => {
    deleteAsset(id, {
      onSuccess: () => {
        toast.success("Asset deleted successfully!");
        refetch();
      },
      onError: () => {
        toast.error("Error deleting asset!");
      },
    });
    setDeleteModalOpen(false);
  };

  return (
    <div className="flex w-full justify-between items-center px-4 md:px-10 py-5 bg-[#121826] rounded-3xl text-sm sm:text-lg shadow-lg shadow-gray-950">
      <p className="w-1/5" style={{ color: selectedColor }}>{assetName}</p>
      <p style={{ color: selectedColor }}>${cost}</p>
      <div className="flex gap-2 md:gap-10">
        <Button style="hover:!text-blue-500" onClick={() => setEditModalOpen(true)}>
          <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
        </Button>
        <Button style="hover:!text-red-500" onClick={() => setDeleteModalOpen(true)}>
          <FontAwesomeIcon icon={faTrash} className="cursor-pointer" />
        </Button>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        title="Edit Asset"
        onClose={() => setEditModalOpen(false)}
        onConfirm={handleSave}
        confirmText="Save"
      >
        <div className="flex flex-col items-center gap-4">
          <InputField
            label="Asset Name"
            id="asset-name"
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <InputField
            label="Cost"
            id="asset-cost"
            type="number"
            value={editedCost}
            onChange={(e) => setEditedCost(Number(e.target.value))}
          />
          <div className="flex flex-col relative w-40 gap-2">
            <Button variant="secondary" style="!py-2 hover:text-blue-500" onClick={() => setShowPicker(!showPicker)}>
              Pick Color
            </Button>
            {showPicker && (
              <div className="absolute -top-80 -left-10 z-10 bg-black p-2 shadow-lg rounded-lg">
                <SketchPicker
                  color={selectedColor}
                  onChange={(updatedColor) => setSelectedColor(updatedColor.hex)}
                />
              </div>
            )}
            <div className="rounded-xl w-1/2 self-center p-1 border border-white" style={{ backgroundColor: selectedColor }}></div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirm Deletion"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        confirmText="Delete"
      >
        <p>Are you sure you want to delete <strong>{assetName}</strong>?</p>
      </Modal>
    </div>
  );
};

export default AssetItem;
