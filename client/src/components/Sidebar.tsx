import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { createTag, deleteTag } from "@app/api/messenger";
import { queryClient } from "@app/index";
import { AppContext } from "@app/pages/App";
import { errorHandler } from "@app/utils";
import { useMutation } from "@tanstack/react-query";
import DeleteIcon from "./DeleteIcon";

const Sidebar = () => {
  const [newTag, setNewTag] = useState("");

  const { tagsData } = useContext(AppContext);
  const { mutate: createTagMutate, isLoading: createTagLoading } = useMutation(
    createTag,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([["tags"]]);
      },
      onError: errorHandler,
    }
  );

  const { mutate: deleteTagMutate, isLoading: deleteTagLoading } = useMutation(
    deleteTag,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([["tags"]]);
      },
      onError: errorHandler,
    }
  );

  const handleAddNewTag = () => {
    if (!newTag) {
      toast.error("Please provide a tag name");
    } else {
      createTagMutate({ tag: newTag });
    }
  };

  const handleDeleteTag = (tag: any) => {
    deleteTagMutate({ tag });
  };

  return (
    <div className="h-full w-[20%] border-0 border-l border-gray-300 bg-[#6743B1] pt-3">
      <div
        id="test"
        className="mb-8 flex justify-center pt-2 text-2xl font-semibold text-white"
      >
        TagMessenger
      </div>
      <div className="customized-scrollbar flex h-[90vh] flex-grow flex-col overflow-y-auto overflow-x-hidden">
        <div className="mb-8 flex items-center px-4">
          <input
            type="text"
            maxLength={16}
            className="h-[48px] w-[205px] rounded-l border border-white bg-[#6743B1] px-4 text-white placeholder-white focus:outline-none"
            placeholder="New tag"
            onChange={(e) => {
              setNewTag(e.target.value);
            }}
          />
          <button
            className="m-0 h-[48px] w-[48px] rounded-r bg-white"
            onClick={handleAddNewTag}
          >
            Add
          </button>
        </div>
        <ul className="flex flex-col items-start px-3">
          {tagsData?.map((tag: any, i: number) => (
            <div
              key={i}
              className="flex h-[48px] w-full cursor-pointer justify-between rounded px-2 transition delay-100 ease-in hover:bg-[#8A69CE]"
            >
              <li className="self-center text-xl text-white">{`# ${tag.name}`}</li>
              <div className="flex items-center">
                <DeleteIcon onClick={handleDeleteTag} data={tag.name} />
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
