# GIẢI THÍCH PHÂN TÍCH HỖN HỢP (MIXED METHODS)

## Nghiên cứu văn hóa chất lượng tại các trường phổ thông liên cấp

**Tài liệu thuyết minh dành cho nghiên cứu sinh, hội đồng và người phản biện**

**Cập nhật:** tháng 7 năm 2026, sau khi đã chạy thực tế notebook tích hợp

---

## 1. Thiết kế nghiên cứu

Nghiên cứu theo thiết kế **giải thích tuần tự** (explanatory sequential design):

```
GIAI ĐOẠN 1                  GIAI ĐOẠN 2                 GIAI ĐOẠN 3
Khảo sát 281 người    →    Phỏng vấn sâu 24 người    →   Tích hợp
5 trường, 17 thang đo      cùng 5 trường                 Joint display
PLS-SEM, MI, clustering    MaxQDA + AI                   Meta-inference
       ↓                          ↓                            ↓
  CÁI GÌ xảy ra              VÌ SAO xảy ra              BỨC TRANH TỔNG THỂ
```

Điểm mấu chốt: định tính **không lặp lại** định lượng mà **giải thích** những phát hiện định lượng khó hiểu nhất.

### Quy mô hai nhánh

| Nhánh | Quy mô |
|---|---|
| Định lượng | 281 người (245 Việt, 36 nước ngoài), 5 trường, 17 thang đo, 81 biến quan sát |
| Định tính | 24 người (15 CBQL, 9 GV), 2.694 đoạn trích, 563.820 từ, 338 mã |
| Tài liệu | Hồ sơ 5 trường, phiếu khảo sát song ngữ, 22 báo cáo phân tích |

**Lưu ý quan trọng về tích hợp:** người tham gia khảo sát và người được phỏng vấn **không phải cùng cá nhân**. Vì vậy mọi suy luận tích hợp chỉ có giá trị ở **cấp trường và cấp hệ thống**, không phải cấp cá nhân. Đây là hạn chế phải nêu rõ trong bài (tiêu chí *sample integration* của Onwuegbuzie & Johnson).

## 2. Bốn công cụ tích hợp đã dùng

| Công cụ | Mục đích | File kết quả |
|---|---|---|
| Joint display | Đặt cạnh nhau kết quả hai nhánh theo từng cấu phần | `01_joint_display.xlsx` |
| Ma trận hội tụ | Phân loại: đồng thuận / một phần / bất đồng / im lặng | `02_convergence_matrix.csv` |
| Lượng hóa định tính | Chuyển định tính thành chỉ số cấp trường | `03_school_level_merged.csv` |
| Đánh giá legitimation | 9 tiêu chí chất lượng suy luận hỗn hợp | `06_legitimation_assessment.csv` |

## 3. Bốn suy luận tích hợp (meta-inference)

Đây là phần trả lời: **tích hợp cho ta biết điều gì mà từng nhánh riêng lẻ không cho biết?**

### M1. Cấu trúc chất lượng hoạt động như tín hiệu văn hóa

- **Định lượng:** mô hình M3 (thêm đường trực tiếp cấu trúc → VHCL) phù hợp hơn có ý nghĩa (Δχ² = 113,9; df = 3; p < 0,001)
- **Định tính:** khối mã cấu trúc chiếm tỷ trọng lớn ở cả hai vai trò
- **Suy luận:** quy trình, phân công, văn bản không chỉ là công cụ quản lý mà còn là bằng chứng để nhân viên đọc ra rằng nhà trường coi trọng chất lượng

### M2. Sự tham gia bị "rỗng hóa"

- **Định lượng:** 68,3% chọn "tham gia ra quyết định" là giá trị quan trọng, nhưng chỉ 5,3% xếp vào top 5; hệ số β không có ý nghĩa (p = 0,157)
- **Định tính:** tồn tại song song mã "tham gia họp" và mã "tham gia thấp"; diễn ngôn giáo viên tập trung vào thất bại lắng nghe
- **Suy luận:** tham gia hình thức (có mặt) khác tham gia thực chất (có ảnh hưởng); thang đo hiện đo cái thứ nhất

### M3. Khoảng cách Việt – nước ngoài là khoảng cách trải nghiệm

- **Định lượng:** d = 2,08 ở VHCL; **cả 5 hệ số quốc tịch mất ý nghĩa** khi kiểm soát VHCL
- **Đo lường:** Tucker's φ = 0,994 cho VHCL, không item nào có DIF → không phải sai lệch đo lường
- **Định tính:** so sánh nội bộ trường cho thấy người nước ngoài quan tâm đặc biệt đến thứ bậc, làm việc nhóm, phản hồi xây dựng, thách thức lòng tin
- **Suy luận:** khoảng cách vận hành **qua cảm nhận VHCL**, không phải qua quốc tịch

### M4. Thiếu cơ chế chuyển hóa

- **Định lượng:** thái độ cá nhân cao nhất (M = 5,06–5,20) nhưng tương quan yếu nhất với VHCL (r = 0,30–0,58)
- **Định tính:** diễn ngôn giáo viên tập trung vào thất bại phản hồi, minh bạch, lắng nghe
- **Suy luận:** thiện chí cá nhân dồi dào; thứ thiếu là **cơ chế tổ chức chuyển hóa** thiện chí thành văn hóa chung

## 4. Hai cảnh báo phương pháp phát hiện khi tích hợp

Phần này quan trọng nhất về mặt liêm chính học thuật. Cả hai đều **không nhìn thấy được** nếu chỉ làm một nhánh.

### 4.1. Quốc tịch lẫn với trường trong nhánh định tính

Cả 3 người nước ngoài được phỏng vấn đều thuộc **một trường (TrB)**. Vì vậy trong nhánh định tính, không thể tách hiệu ứng quốc tịch khỏi hiệu ứng trường.

**Xử lý:** mọi so sánh Việt/nước ngoài trong nhánh định tính được giới hạn **trong nội bộ TrB**. Mất công suất thống kê nhưng giữ được tính hợp lệ.

### 4.2. Sentiment cấp trường bị nhiễm ngôn ngữ — và làm đảo dấu tương quan

Đây là ví dụ điển hình nhất về lý do phải kiểm tra kỹ trước khi tích hợp.

Toàn bộ 327 đoạn tiếng Anh đều nằm ở TrB. Mô hình sentiment tiếng Việt gán nhãn tích cực cho 97,6% đoạn tiếng Anh (độ tin cậy 0,946). Hệ quả:

| Trường | Sentiment (bị nhiễm) | Sentiment (đã sửa, chỉ tiếng Việt) | VHCL khảo sát |
|---|---|---|---|
| TrA | −0,062 | −0,057 | 4,582 |
| **TrB** | **+0,047** (cao nhất) | **−0,241** (thấp nhất) | **4,114** (thấp nhất) |
| TrC | −0,186 | −0,186 | 4,761 |
| TrD | −0,035 | −0,035 | 4,897 |
| TrE | +0,053 | +0,053 | 4,449 |

**Hệ quả nghiêm trọng:** tương quan giữa sentiment và VHCL cấp trường **đảo dấu**:

- Bị nhiễm: ρ = **−0,60** (giọng điệu càng tiêu cực thì VHCL càng cao — vô lý)
- Đã sửa: ρ = **+0,30** (giọng điệu càng tích cực thì VHCL càng cao — hợp lý)

Sau khi sửa, TrB trở thành trường có sentiment thấp nhất **và** VHCL thấp nhất — nhất quán giữa hai nhánh.

**Lưu ý:** cả hai hệ số đều không có ý nghĩa thống kê vì n = 5 trường. Chỉ dùng để mô tả hướng, tuyệt đối không kiểm định.

## 5. Giới hạn n = 5 trường

Đây là giới hạn cứng của mọi phân tích cấp trường trong nghiên cứu này.

**Được phép viết:**
> "Mẫu hình gợi ý ở cấp trường cho thấy trường có giọng điệu định tính tiêu cực nhất cũng là trường có điểm VHCL khảo sát thấp nhất."

**Không được viết:**
> ~~"Tương quan cấp trường giữa sentiment và VHCL là ρ = 0,30."~~ — trình bày hệ số với n = 5 sẽ tạo ấn tượng sai về độ chắc chắn.

## 6. Kiểm tra bắt buộc trước khi dùng notebook mixed

### 6.1. Ánh xạ mã trường

Trong ô 5.1 của notebook có dòng:

```python
SCHOOL_MAP = {1: 'TrA', 2: 'TrB', 3: 'TrC', 4: 'TrD', 5: 'TrE'}
```

**Phải xác nhận ánh xạ này đúng.** Nếu mã trường 1 trong file khảo sát không phải TrA trong dữ liệu phỏng vấn, toàn bộ bảng ghép cấp trường sẽ vô nghĩa **mà vẫn chạy ra số**. Đây là lỗi khó phát hiện nhất trong toàn bộ quy trình.

Cách kiểm tra: đối chiếu số lượng giáo viên, quy mô học sinh, hoặc đặc điểm chương trình giữa hai nguồn.

### 6.2. Kiểm tra ngôn ngữ trước mọi phân tích văn bản

Chạy kiểm tra tỷ lệ dấu tiếng Việt theo nhóm **trước** khi so sánh bất kỳ chỉ số văn bản nào. Nếu hai nhóm khác nhau về ngôn ngữ, mọi so sánh dựa trên văn bản đều vô hiệu; phải chuyển sang so sánh dựa trên **mã**.

## 7. Đánh giá chất lượng suy luận hỗn hợp (legitimation)

Theo 9 tiêu chí của Onwuegbuzie & Johnson (2006):

| Tiêu chí | Đánh giá | Căn cứ |
|---|---|---|
| Sample integration | Trung bình | Khác cá nhân, cùng trường; TrD không có nguồn GV |
| Inside-outside | Tốt | Trích dẫn nguyên văn song song với diễn giải |
| Weakness minimization | Tốt | ĐL thiếu cơ chế → ĐT bù; ĐT mẫu nhỏ → ĐL bù |
| Sequential | Cần khai báo | Phải ghi rõ thứ tự thu thập trong bài |
| Conversion | Thận trọng | Tần suất mã phản ánh cả cách hỏi lẫn thực tế |
| Paradigmatic mixing | Tốt | Lập trường thực dụng được tuyên bố rõ |
| Commensurability | Tốt | M1–M4 không rút ra được từ một nhánh |
| Multiple validities | Trung bình–Tốt | ĐL: MI đạt cho VHCL, HTMT còn chồng lấn. ĐT: có kiểm chứng nhưng AI thất bại một phần |
| Political | Tốt | Khuyến nghị cụ thể cho trường liên cấp đa văn hóa |

## 8. Bài học phương pháp cho phần bàn luận

Nghiên cứu này minh họa một chức năng của mixed methods **ít được nói đến**: hai nhánh không chỉ để **xác nhận lẫn nhau** (triangulation) mà còn để **ràng buộc lẫn nhau** (constraint).

Cụ thể:

- Nhánh định tính **không xác nhận** phát hiện định lượng về khoảng cách nhóm
- Nhánh định tính **tiết lộ** rằng phép kiểm tra định tính dự kiến không thể thực hiện như thiết kế, và chỉ rõ vì sao
- Nhờ đó, cách báo cáo phát hiện định lượng phải thay đổi

Đây là đóng góp phương pháp của bài P6 trong thư mục `Papers_Strategic`.

**Câu nên dùng trong bài:**

> Mixed methods integration is conventionally framed as triangulation toward convergence. This study illustrates an alternative function: the qualitative branch did not corroborate the quantitative finding but constrained it, revealing sampling and language features that materially changed how the survey result should be reported.

## 9. Danh mục file kết quả

| File | Nội dung | Trạng thái |
|---|---|---|
| `01_joint_display.xlsx` | Bảng tích hợp theo cấu phần | Cần NCS bổ sung trích dẫn thật |
| `02_convergence_matrix.csv` | Ma trận hội tụ/bất đồng | Dùng được |
| `03_school_level_merged.csv` | Ghép ĐL–ĐT cấp trường | Dùng được, **sentiment cần thay bằng bản đã sửa** |
| `04_school_level_correlations.csv` | Tương quan cấp trường | **Chỉ mô tả**, n = 5 |
| `05_gap_evidence_layers.csv` | Ba lớp bằng chứng khoảng cách nhóm | Dùng được |
| `06_legitimation_assessment.csv` | Đánh giá 9 tiêu chí | Dùng được |
| `07_meta_inferences.csv` | Bốn suy luận tích hợp | Dùng được |
| `V2_school_sentiment_corrected.csv` | Sentiment cấp trường đã sửa nhiễm ngôn ngữ | **Dùng bản này** |
| `SUMMARY_MIXED.json` | Tổng hợp để viết bài | Dùng được |

## 10. Việc còn phải làm

1. **Xác nhận ánh xạ mã trường** — ưu tiên cao nhất
2. **Hoàn thiện joint display** bằng trích dẫn thật chọn từ `R0_segments_clean.csv`
3. **Thay cột sentiment** trong `03_school_level_merged.csv` bằng bản đã sửa
4. Ghi rõ trong bài: thứ tự thu thập hai nhánh, và việc hai nhánh khác cá nhân
5. Nếu có điều kiện: phỏng vấn thêm giáo viên nước ngoài ở trường khác TrB để gỡ nhiễu quốc tịch–trường

## Cập nhật: truy vết bốn câu hỏi nghiên cứu

Joint display trước đây có một lỗi cấu trúc: mỗi dòng khai báo một **tên cột khác nhau** cho phần
định tính (`Định tính (khối 01_STRUCTURAL)`, `Định tính (khối 04_LEADERSHIP)`, …), nên khi đưa vào
`pandas` bảng sinh ra sáu cột thưa với gần như toàn ô trống thay vì một cột đọc được. Lỗi đã được sửa:

- Gộp về **một cột** `Phát hiện định tính`, kèm cột `Nguồn định tính` ghi rõ khối/mã đã dùng.
- Thêm cột **`Câu hỏi`** để truy vết mỗi dòng về CHNC1–CHNC4.
- Cột định tính nay được **điền tự động** từ `R0_segments_clean.csv`: số đoạn trích, các mã nổi bật
  kèm tần suất và độ phủ trường, cùng một trích dẫn tiêu biểu. Nghiên cứu sinh rà lại và thay bằng
  trích dẫn đắt hơn khi viết.
- Bảng mở rộng từ 7 lên **12 dòng**, bổ sung ba dòng cho CHNC4 (thuận lợi, khó khăn, giải pháp),
  một dòng cho cấp độ tập thể (TRU/SHA) và một dòng riêng cho CHNC3.

File `00_bang_phu_cau_hoi_nghien_cuu.csv` tổng hợp số dòng joint display phục vụ mỗi câu hỏi:
CHNC1 có 6 dòng, CHNC2 có 8, CHNC3 có 2, CHNC4 có 6.

### Phát hiện hội tụ đáng chú ý

Ba nguồn độc lập cùng chỉ về một kết luận: **lõi của văn hóa chất lượng nằm ở cấp độ tập thể, còn
điểm nghẽn nằm ở khối cấu trúc.**

| Nguồn | Bằng chứng |
|---|---|
| CFA cấu phần (CHNC1) | SHA và TRU tải 0,875 và 0,870 lên khối Tâm lý – Tổ chức; COM chỉ 0,528 |
| Thực trạng theo trường (CHNC2) | Chiến lược và Chuẩn mực phân hóa mạnh nhất giữa 5 trường (24,0 và 23,6 điểm phần trăm) |
| Cán cân định tính (CHNC4) | Khối Cấu trúc – Hình thức có cân bằng −11; khối Tập thể +4 |

Đây là dạng hội tụ mạnh nhất trong nghiên cứu hỗn hợp: cùng kết luận, ba phương pháp khác nhau,
hai loại dữ liệu khác nhau.

### Notebook nay chạy được ngoài Colab

Đường dẫn `ROOT` trước đây bị gán cứng vào thư mục Google Drive. Nay notebook tự dò: ưu tiên đường dẫn
Colab, sau đó tới thư mục cha của notebook. Ô gắn Drive cũng bỏ qua êm khi không chạy trên Colab.
Nhờ vậy có thể chạy lại toàn bộ phần tích hợp trên máy cá nhân.
