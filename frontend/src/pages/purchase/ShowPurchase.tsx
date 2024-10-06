import { Button, Chip, Menu, MenuItem, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { HeadLine } from "../../component/HeadLine";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { Image } from "../../component/Image";

import { PaymentStatus, Purchase, purchaseData } from "../../types/purchase";
import {
  handleShowPurchase,
  handleUpdatePurchase,
  setPurchaseData,
} from "../../store/slice/purchaseSlice";
import { getChipColor } from "../../utils/statusColor";

const statusOptions = [
  { key: "Pending", value: "PENDING" },
  { key: "Confirmed", value: "CONFIRMED" },
  { key: "Cancelled", value: "CANCELLED" },
];

export const ShowPurchase = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const purchase = useAppSelector((store) => store.purchase.data) as Purchase;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangeStatus = (payment_status: any) => {
    dispatch(
      handleUpdatePurchase({
        id,
        payment_status,
        onSuccess: () => {
          console.log("success");
          setOpen(false);
        },
      })
    );
  };

  useEffect(() => {
    dispatch(handleShowPurchase(id));
    return () => {
      dispatch(setPurchaseData(purchaseData));
    };
  }, [id]);

  return (
    <Layout title="Purchase Details">
      <HeadLine header="Purchase Details" />
      <div className="mt-5 flex justify-end">
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
                handleChangeStatus(d.value);
              }}
            >
              {d.key}
            </MenuItem>
          ))}
        </Menu>
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
                <Image src={purchase.payment_assetUrl || "./../test.jpg"} />
              </td>
            </tr>
          </tbody>
        </table>
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
      </Paper>
    </Layout>
  );
};
