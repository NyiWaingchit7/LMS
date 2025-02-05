import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { Image } from "@/component/Image";

import { Purchase, purchaseData } from "@/types/purchase";
import {
  setPurchaseData,
  showPurchase,
  updatePurchase,
} from "@/store/slice/purchaseSlice";
import { getChipColor } from "@/utils/statusColor";
import toast from "react-hot-toast";

export const ShowPurchase = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const purchase = useAppSelector((store) => store.purchase.data) as Purchase;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangeStatus = (payment_status: any) => {
    dispatch(
      updatePurchase({
        id,
        payment_status,
        onSuccess: (data) => {
          toast.success(`Payment status is changed to ${data.payment_status}.`);
          dispatch(showPurchase(id));
          setOpen(false);
          setConfirm(false);
        },
      })
    );
  };
  const statusOptions = [
    {
      key: "Confirmed",
      value: "CONFIRMED",
      command: () => {
        handleChangeStatus("CONFIRMED");
      },
    },
    {
      key: "Cancelled",
      value: "CANCELLED",
      command: () => {
        console.log("hello");

        setConfirm(true);
      },
    },
  ];
  useEffect(() => {
    dispatch(showPurchase(id));
    return () => {
      dispatch(setPurchaseData(purchaseData));
    };
  }, [id]);

  return (
    <Layout title="Purchase Details">
      <HeadLine header="Purchase Details" />
      <div className="mt-5 flex justify-end">
        {purchase.payment_status &&
        String(purchase.payment_status) === "CANCELLED" ? (
          <div className="p-3 bg-red-500 text-white rounded-2xl cursor-pointer">
            This Prucahse is cancelled
          </div>
        ) : (
          <div>
            <Button
              id="basic-button"
              variant="contained"
              color="secondary"
              aria-haspopup="true"
              onClick={(event) => {
                setOpen(true);
                setAnchorEl(event.currentTarget);
              }}
            >
              Change status
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => {
                setOpen(false);
                setAnchorEl(null);
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {statusOptions.map((d) => (
                <MenuItem
                  key={d.key}
                  onClick={() => {
                    d.command();
                  }}
                >
                  {d.key}
                </MenuItem>
              ))}
            </Menu>
          </div>
        )}
      </div>
      <Paper className="px-5 py-5 mt-5">
        <h3 className="font-bold my-3">Payment Bank Details</h3>
        <table className="w-full text-left capitalize">
          <tbody>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Student Name
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {purchase?.student?.name || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Lecture
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {purchase?.lecture?.title || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Total Price
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {purchase?.lecture?.discount_price || purchase?.lecture?.price}{" "}
                MMK
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Payment Status
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                <Chip
                  size="small"
                  label={purchase.payment_status}
                  color={getChipColor(purchase.payment_status)}
                />
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 ">Payment Screenshot</th>
              <td className="px-2 py-3 ">-</td>
              <td className="px-2 py-3 ">
                <Image src={purchase.payment_assetUrl || "/test.jpg"} />
              </td>
            </tr>
          </tbody>
        </table>
      </Paper>
      <div className="mt-5">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => {
            navigate("/purchases");
          }}
        >
          Back
        </Button>
      </div>
      <Dialog open={confirm} className=" mx-auto">
        <DialogTitle className="text-green !font-bold !text-xl text-red-700">
          Warning
        </DialogTitle>
        <DialogContent className="w-[350px]">
          Once you cancel , you can not undo!
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setConfirm(false);
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleChangeStatus("CANCELLED");
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};
