import { React, useState } from "react";
import { AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const initialData = [
  {
    id: 1,
    name: "public",
    isFolder: true,
    children: [
      {
        id: 2,
        name: "index.html",
        isFolder: false,
      },
    ],
  },
  {
    id: 3,
    name: "src",
    isFolder: true,
    children: [
      {
        id: 4,
        name: "App",
        isFolder: true,
        children: [
          {
            id: 5,
            name: "App.js",
            isFolder: false,
          },
        ],
      },
      {
        id: 6,
        name: "index.js",
        isFolder: false,
      },
    ],
  },
  {
    id: 7,
    name: "package.json",
    isFolder: false,
  },
];

const FileStructure = ({
  fileList,
  opened,
  setOpened,
  setOpen,
  handleOpen,
  handleDelete,
}) => {
  return (
    <div style={{ paddingLeft: "50px" }}>
      {fileList?.map((node, index) => (
        <div key={index}>
          {node?.isFolder && (
            <span
              style={{ margin: "10px", cursor: "pointer" }}
              onClick={() => handleOpen(node?.id, node)}
            >
              {" "}
              {opened.includes(node?.id) ? <FaAngleDown /> : <FaAngleUp />}
            </span>
          )}
          {node.name}

          {node?.isFolder && (
            <>
              <span
                style={{ cursor: "pointer", marginLeft: "4px" }}
                onClick={() => setOpen({ type: "folder", id: node?.id })}
              >
                <AiOutlineFolderAdd />
              </span>
              <span
                style={{ cursor: "pointer", marginLeft: "4px" }}
                onClick={() => setOpen({ type: "file", id: node?.id })}
              >
                <AiOutlineFileAdd />
              </span>
            </>
          )}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(node?.id)}
          >
            <MdDeleteOutline />
          </span>

          {opened.includes(node.id) &&
            node?.children &&
            node?.children?.length > 0 && (
              <FileStructure
                fileList={node?.children}
                opened={opened}
                setOpened={setOpened}
                setOpen={setOpen}
                handleOpen={handleOpen}
                handleDelete={handleDelete}
              />
            )}
        </div>
      ))}
    </div>
  );
};

const UploadStructure = ({ setOpen, handleAddFile }) => {
  const [fileName, setFileName] = useState();
  return (
    <div>
      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) => setFileName(e.target.value)}
        name={fileName}
      />
      <button onClick={() => handleAddFile(fileName)}>Add </button>
      <button onClick={() => setOpen(null)}>Cancel </button>
    </div>
  );
};

const FileExplorer = () => {
  const [fileList, setFileList] = useState(initialData);
  const [opened, setOpened] = useState([]);
  const [open, setOpen] = useState(null);

  const handleOpen = (id, item) => {
    if (opened.includes(id)) {
      let newArray = opened.filter((ie) => ie !== id);
      let arr = [];

      const func = (file) => {
        file?.map((ie) => {
          arr.push(ie?.id);
          ie?.children && func(ie?.children);
        });
      };
      func(item?.children);
      newArray = newArray.filter((ie) => !arr.includes(ie));
      setOpened(newArray);
    } else {
      setOpened((prev) => [...prev, id]);
    }
  };

  const handleAddFile = (name) => {
    if (name === null) setOpen(null);
    const arr = [];
    const func = (file) => {
      file?.map((ie) => {
        arr.push(ie?.id);
        ie?.children && func(ie?.children);
      });
    };

    func(fileList);
    const newId = Math.max(...arr) + 1;

    let newObj;
    if (open.type === "file") {
      newObj = {
        id: newId,
        name: name,
        isFolder: false,
      };
    } else {
      newObj = {
        id: newId,
        name: name,
        isFolder: true,
        children: [],
      };
    }

    const newArray = [...fileList];

    const putData = (obj) => {
      obj?.map((ie) => {
        if (ie?.id == open?.id) {
          ie?.children.push(newObj);
          return;
        }
        ie?.children && putData(ie?.children);
      });
    };

    putData(newArray);
    setFileList(newArray);
    setOpen(null);
  };

  const deleteNodeById = (node, id) => {
    return node
      ?.filter((item) => item.id !== id)
      .map((item) => {
        if (item?.isFolder && item?.children) {
          return {
            ...item,
            children: deleteNodeById(item?.children, id),
          };
        }
        return item;
      });
  };
  const handleDelete = (id) => {
    const newArray = deleteNodeById(fileList, id);
    setFileList(newArray);
  };
  return (
    <>
      <FileStructure
        fileList={fileList}
        opened={opened}
        setOpened={setOpened}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleDelete={handleDelete}
      />
      {open && (
        <div style={{ marginTop: "8px" }}>
          <UploadStructure setOpen={setOpen} handleAddFile={handleAddFile} />
        </div>
      )}
    </>
  );
};

export default FileExplorer;
