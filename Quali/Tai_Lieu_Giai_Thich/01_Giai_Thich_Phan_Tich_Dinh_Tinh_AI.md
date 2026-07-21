# GIẢI THÍCH PHÂN TÍCH ĐỊNH TÍNH BẰNG AI VÀ PhoBERT

## Nghiên cứu văn hóa chất lượng tại các trường phổ thông liên cấp

**Tài liệu thuyết minh dành cho nghiên cứu sinh, hội đồng và người đọc không chuyên sâu về xử lý ngôn ngữ**

**Cập nhật:** tháng 7 năm 2026, sau khi đã chạy thực tế toàn bộ notebook

---

## 1. Tài liệu này trả lời điều gì

Sau khi chạy notebook `Phan_Tich_Dinh_Tinh_AI_PhoBERT.ipynb`, kết quả thu được **không như kỳ vọng ban đầu**. Tài liệu này giải thích:

1. Dữ liệu định tính gồm những gì và được xử lý ra sao
2. Phần nào của phân tích AI cho kết quả dùng được
3. Phần nào **thất bại**, vì sao thất bại, và vì sao đó lại là phát hiện có giá trị
4. Cách diễn giải và báo cáo từng kết quả cho đúng mức

Nguyên tắc xuyên suốt: **báo cáo trung thực con số thật**, kể cả khi con số đó cho thấy phương pháp không hoạt động.

## 2. Dữ liệu định tính: hai lớp phải tách riêng

Workbook MaxQDA chứa hai loại nội dung hoàn toàn khác nhau trong cùng một bảng:

| Lớp | Số ô | Bản chất | Dùng để làm gì |
|---|---:|---|---|
| Trích dẫn người được phỏng vấn | 2.694 | Lời nói nguyên văn | Phân tích AI, phân tích diễn ngôn |
| Tổng hợp của nghiên cứu sinh | 3.585 | Diễn giải, đánh giá hội tụ/phân kì | Đối chiếu, kiểm chứng |

**Đây là điểm bắt buộc về liêm chính học thuật.** Nếu trộn hai lớp, mọi phân tích ngôn ngữ sẽ đo chính giọng văn của nghiên cứu sinh chứ không phải của người được phỏng vấn. Notebook tách tự động dựa trên tên cột.

### Đặc điểm corpus sau khi tách

| Chỉ số | Giá trị |
|---|---|
| Đoạn trích phỏng vấn | 2.694 |
| Tổng số từ | 563.820 |
| Độ dài trung vị mỗi đoạn | 144 từ |
| Số mã | 338 |
| Số người được phỏng vấn | 24 (15 CBQL, 9 GV) |
| Số trường | 5 |
| Người nước ngoài | 3 người, 328 đoạn |

**Phân bố không đều theo trường:** TrB có 1.318 đoạn, TrC chỉ 215. Khi so sánh liên trường phải nêu rõ giới hạn này.

## 3. Ba đặc điểm của dữ liệu quyết định mọi kết quả sau đó

Ba đặc điểm này phải được kiểm tra **trước** khi chạy bất kỳ phân tích AI nào. Chúng giải thích gần như toàn bộ những gì xảy ra tiếp theo.

### 3.1. Corpus có hai ngôn ngữ

Phỏng vấn người nước ngoài được thực hiện **bằng tiếng Anh**. Tỷ lệ từ có dấu tiếng Việt:

- Người Việt: 0,799
- Người nước ngoài: 0,011

PhoBERT là mô hình **chỉ dành cho tiếng Việt**. Khi gặp tiếng Anh, nó không báo lỗi mà đẩy văn bản đó vào một vùng riêng biệt trong không gian vector.

### 3.2. Đoạn trích rất dài

Trung vị 144 từ; 41,6% số đoạn vượt 170 từ. PhoBERT trong notebook dùng giới hạn 256 token. Tiếng Việt trung bình hơn 1,5 token mỗi từ, nên **một tỷ lệ lớn đoạn bị cắt ngang**.

### 3.3. Ngôn ngữ nói có nhiều từ đệm

Phỏng vấn bán cấu trúc chứa rất nhiều "dạ", "vâng", "ừ", "thì là", câu tự sửa. Mô hình ngữ cảnh mã hóa trung thực phần này, và vì nó xuất hiện ở mọi chủ đề nên trở thành thành phần chung lấn át tín hiệu chủ đề.

## 4. Kết quả: cái gì hoạt động, cái gì không

### 4.1. Bảng tổng hợp

| Phân tích | Kết quả | Đánh giá | Dùng được? |
|---|---|---|---|
| Mạng lưới đồng xuất hiện mã | 120 mã, 2.606 liên kết, mật độ 0,365 | Tốt | **Có** |
| Hội tụ/phân kì liên trường | 126 mã hội tụ, 16 mã phân kì | Tốt | **Có** |
| Đối chiếu phán đoán thủ công | Spearman ρ = 0,785; p < 0,001 | Rất tốt | **Có** |
| Bão hòa mã | 302/338 mã trong nửa đầu dữ liệu | Tốt | **Có** |
| Log-odds so sánh vai trò | CBQL vs GV khác biệt rõ | Tốt | **Có** |
| Phân cụm TF-IDF | ARI = 0,206; NMI = 0,345 | Vừa phải | **Có** (kèm diễn giải) |
| Phân cụm PhoBERT | ARI = 0,065 → 0,035 (chỉ tiếng Việt) | Kém | Chỉ để báo cáo thất bại |
| BERTopic | Chỉ ra 2 chủ đề = 2 ngôn ngữ | Thất bại | Chỉ để báo cáo thất bại |
| Zero-shot gán nhãn | kappa = 0,060; accuracy = 0,138 | Thất bại | Chỉ để báo cáo thất bại |
| Tương đồng ngữ nghĩa giữa trường | Dao động 0,985–0,998 | Không phân biệt được | Không |
| Sentiment toàn corpus | Nước ngoài +0,92 vs Việt −0,13 | **Sai lệch** | **Không** |
| Sentiment chỉ tiếng Việt | −0,127; CBQL −0,173 vs GV −0,055 | Dùng được | **Có** |

### 4.2. Điều nghịch lý đáng chú ý nhất

**Phương pháp đơn giản (TF-IDF) cho kết quả tốt hơn phương pháp hiện đại (PhoBERT).**

- TF-IDF: ARI = 0,206
- PhoBERT: ARI = 0,065
- PhoBERT chỉ trên tiếng Việt: ARI = 0,035

Nghe có vẻ vô lý, nhưng có lý do rõ ràng: PhoBERT mã hóa **trung thực** hai thứ chiếm ưu thế trong corpus này là ngôn ngữ và văn phong nói — đúng hai thứ mà phân tích **không quan tâm**. TF-IDF loại bỏ cả hai (vì từ xuất hiện ở mọi văn bản bị hạ trọng số), và nhờ đó giữ lại nhiều tín hiệu chủ đề hơn.

Bằng chứng định lượng: có thể dự đoán ngôn ngữ phỏng vấn từ vector PhoBERT với độ chính xác **99,8%**.

## 5. Trường hợp sentiment: một phát hiện suýt bị công bố sai

Đây là bài học quan trọng nhất của toàn bộ quá trình.

### 5.1. Kết quả ban đầu

| Nhóm | Điểm cảm xúc trung bình |
|---|---|
| Người Việt | −0,127 |
| Người nước ngoài | **+0,916** |

Kết quả này nói rằng giáo viên nước ngoài có giọng điệu **tích cực hơn nhiều** so với đồng nghiệp Việt Nam — **ngược hoàn toàn** với kết quả khảo sát định lượng (d = 2,08, người nước ngoài đánh giá thấp hơn).

Đây chính là loại "bất đồng giữa hai nhánh" mà tài liệu mixed methods thường coi là phát hiện thú vị cần lý giải.

### 5.2. Sự thật

Kiểm tra chi tiết cho thấy:

- **97,6%** đoạn tiếng Anh được gán nhãn POSITIVE
- Độ tin cậy trung bình **0,946**
- Bao gồm cả những câu hoàn toàn trung tính như *"We have around 500 students, actually less than 500."*

Mô hình sentiment được huấn luyện cho tiếng Việt. Khi gặp tiếng Anh, nó **không trả về kết quả không chắc chắn** mà trả về một nhãn duy nhất với độ tin cậy gần như tuyệt đối.

### 5.3. Kết quả đúng

Chỉ tính trên đoạn tiếng Việt (nơi mô hình hoạt động đúng miền):

| Chỉ số | Giá trị |
|---|---|
| Trung bình chung | −0,127 |
| CBQL | −0,173 |
| Giáo viên | −0,055 |
| Kiểm định | t = −3,51; p < 0,001; d = 0,148 |

Mã có giọng điệu tiêu cực nhất: văn hóa chất lượng thiếu quyết đoán (−0,976), rào cản giao tiếp (−0,957), thách thức cơ chế quản trị (−0,801), thất bại phản hồi (−0,759), nguyên nhân từ lãnh đạo (−0,715).

**Không được rút ra bất kỳ kết luận nào về so sánh Việt/nước ngoài từ sentiment.**

## 6. Cách diễn giải từng kết quả cho đúng

### 6.1. Được phép viết

- "Cấu trúc mạng lưới mã cho thấy các mã về kết quả nghề nghiệp nằm ở vị trí trung tâm."
- "126 trong 338 mã xuất hiện ở ít nhất 4/5 trường, cho thấy mẫu hình chung của hệ thống."
- "Phán đoán hội tụ thủ công của nghiên cứu sinh tương quan mạnh với chỉ số độ phủ tự động (ρ = 0,785)."
- "Trong nội bộ nhóm nói tiếng Việt, CBQL có giọng điệu tiêu cực hơn giáo viên một cách có ý nghĩa thống kê, với mức hiệu ứng nhỏ."
- "PhoBERT cho độ trùng khớp thấp hơn TF-IDF; nguyên nhân là đặc điểm corpus chứ không phải chất lượng mã hóa."

### 6.2. Không được viết

- ~~"Phân tích cảm xúc cho thấy giáo viên nước ngoài hài lòng hơn."~~ — sai lệch do ngôn ngữ.
- ~~"BERTopic phát hiện 2 chủ đề chính trong dữ liệu."~~ — hai "chủ đề" đó là hai ngôn ngữ.
- ~~"AI xác nhận hệ mã hóa là chính xác."~~ — AI chỉ cho biết mức trùng khớp, không phán xét đúng sai.
- ~~"Kappa thấp chứng tỏ mã hóa thủ công có vấn đề."~~ — kappa thấp ở đây là thuộc tính của quy trình zero-shot, không phải của hệ mã.
- ~~"Các trường có diễn ngôn tương đồng cao (0,985–0,998)."~~ — khoảng dao động quá hẹp, không phân biệt được.

## 7. Vì sao thất bại này lại có giá trị công bố

Ba lý do:

1. **Rất ít nghiên cứu công bố kết quả âm tính về công cụ AI.** Người đọc muốn dùng PhoBERT cho dữ liệu định tính hiện không có cơ sở nào để dự đoán khi nào nó không hoạt động.

2. **Ba nguyên nhân đều kiểm tra được trước.** Đa ngôn ngữ, độ dài đoạn, thể loại văn bản — cả ba đều có thể kiểm tra trong vài phút. Đây là khuyến nghị thực hành cụ thể.

3. **Trường hợp sentiment là ví dụ điển hình về "kết quả đẹp nhưng sai".** Nó có ý nghĩa thống kê mạnh, hợp lý về mặt trực giác, và hoàn toàn là sản phẩm của lỗi kỹ thuật. Đây là bài học mà cộng đồng nghiên cứu cần.

Bài báo P1 trong thư mục `Papers_Strategic` được viết theo hướng này.

## 8. Khuyến nghị nếu muốn chạy lại tốt hơn

| Vấn đề | Giải pháp |
|---|---|
| Corpus đa ngôn ngữ | Tách riêng theo ngôn ngữ, hoặc dùng mô hình đa ngữ (XLM-R, LaBSE) |
| Đoạn quá dài | Chia nhỏ theo lượt nói, hoặc tăng max_length lên 512 |
| Từ đệm nhiều | Lọc kỹ hơn trước khi nhúng; cân nhắc chỉ giữ câu có nội dung |
| Zero-shot thất bại | Dùng few-shot với ví dụ thật thay vì mô tả ngắn |
| Sentiment | Chỉ chạy trong miền ngôn ngữ của mô hình; hoặc gán nhãn thủ công 200 đoạn làm chuẩn |

Tuy nhiên cần cân nhắc: **các phân tích dựa trên mã (network, hội tụ/phân kì, log-odds) đã cho kết quả tốt và không phụ thuộc ngôn ngữ.** Đầu tư thêm vào embedding có thể không đem lại giá trị tương xứng.

## 9. Danh mục file kết quả

| File | Nội dung | Trạng thái |
|---|---|---|
| `R0_segments_clean.csv` | 2.694 đoạn đã làm sạch | Dùng được |
| `R1_code_frequency.csv` | Tần suất và độ phủ từng mã | Dùng được |
| `R2_network_centrality.csv` | Độ trung tâm mạng lưới | Dùng được |
| `R3_code_school_matrix.csv` | Ma trận mã × trường | Dùng được |
| `R4b_logodds_within_school.csv` | So sánh nội bộ trường (tránh nhiễu) | Dùng được |
| `R5_logodds_leader_vs_teacher.csv` | So sánh CBQL vs GV | Dùng được |
| `V1_sentiment_vietnamese_only.csv` | Sentiment chỉ tiếng Việt | Dùng được |
| `VERIFICATION_PHOBERT.json` | Toàn bộ chẩn đoán thất bại | Dùng được |
| `04_bertopic_topics.csv` | Chủ đề BERTopic | **Chỉ để báo cáo thất bại** |
| `07_sentiment_by_code.csv` | Sentiment toàn corpus | **Không dùng** (lẫn tiếng Anh) |
| `10_school_semantic_similarity.csv` | Tương đồng giữa trường | **Không dùng** (không phân biệt) |
| `11_discourse_foreign_vs_vn.csv` | So sánh diễn ngôn theo văn bản | **Không dùng** (nhiễu ngôn ngữ) |

## 10. Khai báo sử dụng AI khi công bố

Mẫu câu cho phần phương pháp:

> Qualitative data were coded manually in MaxQDA following the study's conceptual framework. To assess the structural properties of the resulting codebook, two computational comparators were applied: TF-IDF vectorisation and PhoBERT contextual embeddings. Agreement between automated partitions and analyst categories is reported for both. Automated procedures served exclusively as a diagnostic layer; all interpretive claims rest on the manual coding. Sentiment classification was restricted to Vietnamese-language segments because the classifier is monolingual; cross-language comparison was found to produce systematic artefacts and is not reported.
