<h1 style="text-align: center; line-height: 1.6">immino <br /> Gezinge (Trajectory) Verisi İşleme</h1>

https://omrumbakitemiz.github.io/immino-client/


### Dağıtık Hesaplama Yöntemleri ile Uygulama Geliştirme

![Uygulama Ana Ekranı](https://github.com/omrumbakitemiz/immino-client/raw/master/docs/images/image4.png)


Haraket eden nesnelerin gerçek zamanlı olarak konum bilgilerinin tespit edilmesi ve bu konumlar kullanılarak seyahat yollarının (trajectories) oluşturulması günümüz teknolojisinin getirmiş olduğu imkanlardan biridir. Bu bilgiler tek başına bir anlam ifade etmemekte olup sadace ham veri olarak kalmaktadır. Ancak bu veriler analiz edilerek bir çok yararlı bilgi elde edebiliriz. Seyahat verilerinden bilgi çıkarımı için bir takım ön işlemler (veri azaltma, filtreleme vs) yapılır. Daha sonra çeşitli sorgulamalar yapılabilir. İleri seviyede ise seyahat verileri üzerinde sınıflandırma, anomali tespiti, segmentasyon, öneri sistemleri vs gerçekleştirmek mümkündür. Şekil 1’de 3 farklı kullanıcıya ait trajectory verisi gosterilmistir.

<p align="center">
  <img src="https://github.com/omrumbakitemiz/immino-client/raw/master/docs/images/image1.png"/>
</p>

![Uygulamaya Genel Görünüm](https://github.com/omrumbakitemiz/immino-client/raw/master/docs/images/image4.png)

Bu projede, ham trajectory verileri üzerinde veri indirgeme ön işlemi ve alan sorgusu yapan iki servis sağlayan bir sunucu ve bu sunucuyu kullanan bir istemci geliştirilecektir. İstemci, ham trajectory datasını sunucuya gönderecektir. Sunucu, aldığı datayı istenen servise göre işleyip sonucu istemciye gönderecektir (Şekil 2’ye bakınız).

#### İSTENENLER
• Ham veri bir text dosyasında istemci tarafında tutulmaktadır. Ham gezinge verisi dosyadan okunup Google, Yahoo gibi harita tabanlı teknojilerden biri ile path seklinde (datasetteki ardışıl lat-long verilerini line ile birlestirme yoluyla) istemci arayüzünde gösterilir. Örneğin datasette 10 tane lat-long verisi varsa p1-p2, p2- p3,.....p9-p10 seklinde birleştirilerek Şekil3’teki gibi harita üzerinde gösterilir.

> Şekil 3’te indirgeme olayı resmedilmiştir.

<p align="center">
  <img src="https://github.com/omrumbakitemiz/immino-client/raw/master/docs/images/image3.png"/>
</p>

> Örnek Veri Seti

<p align="center">
  <img src="https://github.com/omrumbakitemiz/immino-client/raw/master/docs/images/image9.png"/>
</p>

İstemci ham datayı indirgenmesi icin sunucuya gonderir. “İndirgeme servisi” yoluyla indirgenen data, indirgeme oranı ve indirgeme süresi istemciye gönderilir. İndirgenen data harita üzerinde gösterilir. Ayrıca ham datanın da aynı sekilde baska bir harita üzerinde gösterimi sağlanarak birbirlerinden farkı gösterilebilir olmalıdır. Diğer bilgiler (oran, süre) istemci arayüzünde gösterilir.

<p align="center">
  <img src="https://github.com/omrumbakitemiz/immino-client/raw/master/docs/images/image2.png"/>
</p>

İndirgeme oranı= (1 - (indirgeme sonrası veri sayısı / ham veri sayısı)) * 100

> Projede kullanılan veri indirgeme yöntemi

* [Ramer–Douglas–Peucker - JavaScript İmplementation](http://karthaus.nl/rdp)

* [Ramer–Douglas–Peucker - Wikipedia](https://en.wikipedia.org/wiki/Ramer–Douglas–Peucker_algorithm)

##### Sorgu

İstemci indirgenen ve/veya ham data üzerinde interaktif olarak alan sorgusu yaparak “Sorgu servisi” nden sorgu alanı içine düşen verileri alır. Sorgu servisi sorgu alanı koordinatlarını ve sorgulanacak indirgenmiş koordinatları sorgu servisine gönderir ve sorgu icine düşenler koordinatlar istemciye gönderir. Burada alan sorgusu, Şekil 4’te kırmızı ile belirtildiği gibi dikdörtgensel bir sorgudur. Sorgu sonucunda ilgili alan icine dusen veriler istemci tarafında harita uzerinde tablo olarak gösterilmektedir.

![Şekil 4 - Sorgulama](https://github.com/omrumbakitemiz/immino-client/raw/master/docs/images/image5.png)
