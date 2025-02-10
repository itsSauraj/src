"use client";

import type { RootState, StoreDispatch } from "@/redux/store";
import type { UserProfileUpdateSchema } from "@/dependencies/yup";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { Camera } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { userProfileUpdateSchema } from "@/dependencies/yup";
import { UserProfileUpdateSkeleton } from "@/components/dashboard/skeleton/profile";
//APIs
import { updateProfile } from "@/lib/api";

const UserProfileUpdate = () => {
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useDispatch<StoreDispatch>(); // eslint-disable-line
  const userData = useSelector((state: RootState) => state.user.user);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(
    (process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") + (userData?.avatar || ""),
  );

  const profileForm = useForm({
    resolver: yupResolver(userProfileUpdateSchema),
    defaultValues: {
      employee_id: userData?.employee_id ?? "",
      username: userData?.username ?? "",
      first_name: userData?.first_name ?? "",
      last_name: userData?.last_name ?? "",
      email: userData?.email ?? "",
      phone_number: userData?.phone_number ?? "",
      birth_date: userData?.birth_date ?? "",
      joining_date: userData?.joining_date ?? "",
      address: userData?.address ?? "",
    },
    mode: "onChange",
  });

  const onProfileSubmit = async (data: UserProfileUpdateSchema) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof UserProfileUpdateSchema];

      if (key === "birth_date" || key === "joining_date") {
        formData.append(key, format(new Date(value as string), "yyyy-MM-dd"));
      } else {
        formData.append(key, value as string);
      }
    });

    if (profileImageFile) formData.append("avatar", profileImageFile as File);

    dispatch(updateProfile(formData));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfileImageFile(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <UserProfileUpdateSkeleton />;

  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
              {profileImage ? (
                <Image
                  alt="Profile"
                  className="w-full h-full object-cover"
                  height={96}
                  src={profileImage}
                  width={96}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <input
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              onChange={handleImageUpload}
            />
            <div className="absolute bottom-0 right-0 p-1 bg-primary rounded-full">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <CardTitle>Profile Settings</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Update your profile information
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...profileForm}>
          <form
            className="space-y-4"
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <FormField
                control={profileForm.control}
                name="employee_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Employee ID"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        max={format(new Date(), "yyyy-MM-dd")}
                        placeholder="Date of Birth"
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? format(new Date(field.value), "yyyy-MM-dd")
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="joining_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Joining Date</FormLabel>
                    <FormControl>
                      <Input
                        max={format(new Date(), "yyyy-MM-dd")}
                        placeholder="Joining Date"
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? format(new Date(field.value), "yyyy-MM-dd")
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button
                disabled={profileForm.formState.isSubmitting}
                type="submit"
              >
                {profileForm.formState.isSubmitting
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserProfileUpdate;
