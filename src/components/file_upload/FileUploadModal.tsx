import { useState, useEffect } from "react";
import { Modal } from "@components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ALL_ARTWORKS, ORDER, apiClientFormData, apiClient } from "@utils";

type FileUpload = {
  digital_artwork?: File | null | Blob | any;
  job_id?: number | null | any;
  order_id?: number | null;
};

function FileUploadModal({ modalFileUpload, handleClose, target }: any ) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);
  const [file, setFile] = useState<FileUpload>({
    digital_artwork: null,
    job_id: null,
    order_id: null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    setFile({
      digital_artwork: null,
      job_id: target.job_id,
      order_id: target.order_id,
    });
  }, [target]);

  // console.log("FILE JI", file.job_id);
  // console.log("FILE OI", file.order_id);
  const queryClient = useQueryClient();
  const mutationUpload = useMutation({
    mutationFn: (file: any) => {
      const formData = convertPayloadToFormData(file);
      console.log("FORMDATA:", formData);
      return apiClientFormData.post(ALL_ARTWORKS, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allJobs"],
        exact: true,
        refetchType: "all",
      }),
        console.log("UPLOADED ARTWORK");
      setVisible(true);
    },
  });
  const mutationSubmit = useMutation({
    mutationFn: (file: any) => {
      const data = {
        order: {
          order_status: "delivered",
        },
      };
      return apiClient.patch(ORDER(file.order_id), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allJobs"],
        exact: true,
        refetchType: "all",
      }),
        console.log("UPDATED ORDER");
      navigate("/w/dashboard");
    },
  });

  const convertPayloadToFormData = (file: FileUpload) => {
    const formData = new FormData();
    formData.append("artwork[digital_artwork]", file.digital_artwork);
    formData.append("artwork[job_id]", file.job_id);

    return formData;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile({ ...file, digital_artwork: selectedFile });
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const close = () => {
    handleClose()
    setPreviewUrl(null)
  }

  const handleUpload = (e: any) => {
    e.preventDefault();
    mutationUpload.mutate(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutationSubmit.mutate(file);
  };

  return (
    <Modal open={modalFileUpload} onClose={
      close}>
      <div className="flex flex-col gap-4 px-4">
        <h1 className="font-bold text-lg">Upload Artwork</h1>
        <input
          type="file"
          name="digital_artwork"
          id="digital_artwork"
          required
          onChange={handleFileChange}
        />
        {previewUrl && (
          <div className="flex justify-center items-center">
            <img
              src={previewUrl}
              alt="Artwork Preview"
              className="max-w-full max-h-64"
            />
          </div>
        )}
        <div className="flex flex-col justify-center items-center gap-4">
          <button
            className={`btn__primary text-white ${
              file.digital_artwork ? "bg-green" : "bg-grey"
            }`}
            onClick={handleUpload}
            disabled={!file.digital_artwork}
          >
            UPLOAD
          </button>
          {visible && (
            <button className="btn__primary bg-pink" onClick={handleSubmit}>
              Deliver Artwork
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default FileUploadModal;
