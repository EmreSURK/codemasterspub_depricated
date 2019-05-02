codemasterspub.com 'un kodlarının bulunduğu repo.

# CodeMastersPub Nedir?
Mühendisler ve bilim insanları gibi geleceği inşa eden profesyonellerin futbol, siyaset, trafik,  onbin daha verip şunu alsaydın keşke, aslında şurada bi cafe açacaksın gibi sonuca çıkmayacak gereksiz konularla ömür geçirmek yerine geleceği ve medeniyeti inşa edebileceği konular üzerine odaklandığı, birlikte projeler inşa ettiği sosyal iletişim ve tanışma platformdur. Davetiye usulü üye almaktadır.

# Başlıca Amaçlar
- Dünyayı değiştirmek isteyen saygın profesyonellerin iletişim kurması ve tanışması
- Önemli konular hakkında gerçek  tecrübelerin ve doğrulanabilir bilgilerin aktarılması
- Günlük oyalayıcı konuların etrafımızı daha fazla sarmasının önlenmesi
- Fikirlerin ve bilgilerin üzerinde tartışıp daha ileriye taşınması.

# Teknik Altyapı
- Proje NodeJS, Jade, MySQL teknolojileri ile inşa edilmiş, ilk hafta RaspberryPi'ye host edilmiş, daha sonra DigitalOcean'daki Ubuntu sunucuda yayına alınmıştır.

# Mevcut Durum
- En baştayız.
- Fonksiyon olarak üye olma, konu açma ve mesaj yazmadan ibaret. ToDo listemiz kabarık.
- Projeye destek olmak isterseniz şuradan alabiliriz; - [Projeye Nasıl Katkı Sağlarım?](#destek)

# Katkı Sağlamak
### Yazılımcı mısın?
#### Başlangıç Seviyesindeysen
Konu açarak insanların bilgilerini aktarmalarına öncülük edebilirsin.
#### İleri Seviyedeysen 
Projenin geliştirilmesinde destek olabilir(bknz:backlog) veya doğrulanabilir, kaliteli tecrübe ve bilgilerini PUB'da paylaşabilirsin.
### Bilimle mi ilgileniyorsun?
Popüler bilim konularını PUB'a taşıyarak içeriği zenginleştirebilirsin.

### Başka Bir Uzmanlık
Mutlaka katkı sağlayabileceğin bir konu vardır, iletişime geçebilirsin.

# Sistem Kurulumu
- Sisteminizde Node ve MySQLServer kurulu olmalı.
- Tüm dosyaları indiriniz.
- Bilgisayardaki MySQL Server 'ı çalıştırıp coderhub isimli bir veri tabanı şeması oluşturun.
- Veritabanı için local isimli, şifresi boş bir kullanıcı oluşturun.
- dbCreate.sql dosyasını açın, bu kodları kopyalayıp çalıştırın, bu şekilde DB oluşacaktır.
- Terminal ile indirdiğiniz klasöre gibi 'npm install' komutunu çalıştırın.
- 'node bin/wwwcodemasterspub.js' komutu ile uygulamayı bşlatın.
- Eğer her şey yolunda gittiyse localhost:3009 adresinden kendi bilgisayarınızda çalışan kopyaya ulaşabilirsiniz.

# Katkı Sağlayanlar
- Emre ŞURK; CMPub'ı başlattı.

Buraya yeni isimler yazmak için sabırsızlıkla beliyoruz. Üst limit şimdilik 20 kişi.

# Backlog ( ToDo Listesi )
- Responsive yapısının fixlenmesi.
- Test yazılması.
- Konu mesajlarına sayfalama sistemi.
- Konu mesajlarına oylama sistemi.
- Konu mesajlarının en çok oydan en az oya sıralanması.
- Katkıda bulunmak için bir video anlatım hazırlanması.
- Konu mesajlarına düzenleme ve silme seçeneği
- Konu mesajlarına düzenleme tarihçes
- Profildeki sayıların çalışır hale gelmesi.