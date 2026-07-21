# HƯỚNG DẪN CHẠY CÁC PHÂN TÍCH BỔ SUNG

## Nghiên cứu văn hóa chất lượng — tài liệu vận hành cho nghiên cứu sinh

**Cập nhật:** tháng 7 năm 2026

---

## 1. Bản đồ toàn bộ hồ sơ phân tích

```
MsKimSon/
├── DinhLuong/
│   ├── Cleaned_Data/281_PKS_ThongKe_Full_v1.3.xlsx      ← dữ liệu gốc
│   ├── KetQuaPhanTich/
│   │   ├── Phan_Tich_VHCL.ipynb                         ← notebook chính (tiếng Việt)
│   │   ├── Quality_Culture_Analysis_EN.ipynb            ← bản tiếng Anh
│   │   ├── ket_qua/ và results_en/                      ← kết quả
│   │   └── Tai_Lieu_Giai_Thich/                         ← 4 tài liệu thuyết minh
│   ├── Phan_Tich_Chuyen_Sau/ket_qua_MI_Cluster/         ← MI + clustering (MỚI)
│   └── Papers/                                          ← 2 bản thảo tiếng Anh
├── DinhTinh/
│   ├── *_SUM_00-10_*.xlsm                               ← workbook MaxQDA
│   ├── Bo_11_Bao_cao_*/                                 ← 22 báo cáo phân tích
│   └── Phan_Tich_AI/
│       └── Phan_Tich_Dinh_Tinh_AI_PhoBERT.ipynb         ← notebook AI (MỚI)
└── MixedMethods/
    └── Phan_Tich_Hon_Hop_Mixed_Methods.ipynb            ← tích hợp (MỚI)
```

## 2. Thứ tự chạy bắt buộc

Các notebook có phụ thuộc lẫn nhau. Chạy sai thứ tự sẽ báo lỗi thiếu file.

| Bước | Chạy gì | Sinh ra gì | Thời gian ước tính |
|---|---|---|---|
| 1 | `Phan_Tich_VHCL.ipynb` | `ket_qua/summary.json` + bảng CSV | 5–15 phút |
| 2 | `mi_cluster.py` | `ket_qua_MI_Cluster/` | dưới 1 phút |
| 3 | `Phan_Tich_Dinh_Tinh_AI_PhoBERT.ipynb` | `ket_qua_ai/` | 30–90 phút (CPU), 10–20 phút (GPU) |
| 4 | `Phan_Tich_Hon_Hop_Mixed_Methods.ipynb` | `ket_qua_mixed/` | dưới 2 phút |

## 3. Notebook định tính AI — những điều cần biết trước khi chạy

### 3.1. Cài đặt

```bash
pip install torch transformers bertopic hdbscan umap-learn
pip install underthesea networkx scikit-learn pandas openpyxl matplotlib seaborn
```

Lần chạy đầu tiên sẽ tải PhoBERT (~500 MB) từ HuggingFace. Cần kết nối internet.

Nếu `underthesea` cài lỗi trên Windows, thay bằng `pip install pyvi` — notebook tự động chuyển sang phương án dự phòng.

### 3.2. Điều quan trọng nhất: hai lớp dữ liệu được tách riêng

Workbook MaxQDA chứa hai loại nội dung hoàn toàn khác nhau trong cùng một bảng:

- **2.694 ô** là trích dẫn nguyên văn của người được phỏng vấn → dùng cho phân tích AI
- **3.585 ô** là phần tổng hợp do chính nghiên cứu sinh viết (các cột "Điểm hội tụ liên trường", "Điểm phân kì liên trường", "Diễn giải học thuật", "Mức độ bằng chứng")

Notebook tự động tách hai lớp này. **Đây là điểm bắt buộc về liêm chính học thuật:** nếu trộn lẫn, phân tích diễn ngôn sẽ đo chính giọng văn của nghiên cứu sinh chứ không phải của người được phỏng vấn, và mọi kết luận sẽ vô hiệu.

Phần tổng hợp của nghiên cứu sinh vẫn được dùng, nhưng ở mục 8.1b với vai trò khác: đối chiếu xem chỉ số hội tụ/phân kì tính tự động có tái hiện được phán đoán thủ công hay không.

### 3.3. Cấu trúc corpus thực tế

| Chỉ số | Giá trị |
|---|---|
| Đoạn trích phỏng vấn | 2.694 |
| Tổng số từ | 563.820 |
| Số mã (code) | 338 |
| Số người được phỏng vấn | 24 |
| Số trường | 5 (TrA–TrE) |
| Nguồn người nước ngoài | 3 người, 328 đoạn |
| Ghi chú tổng hợp của NCS | 3.585 |

Phân bố theo trường không đều: TrB có 1.318 đoạn, TrC chỉ 215. Khi so sánh liên trường phải nêu rõ giới hạn này.

### 3.4. Diễn giải kết quả AI đúng mức

**ARI và NMI thấp không có nghĩa mã hóa của con người sai.** Con người mã hóa theo *chức năng lý thuyết* của phát ngôn; AI nhóm theo *tương đồng ngữ nghĩa bề mặt*. Hai logic khác nhau. ARI trong khoảng 0,10–0,30 là bình thường và vẫn có ý nghĩa.

**Cohen's kappa** giữa nhãn AI và mã người: với 11 nhãn, kappa 0,30–0,50 đã cho thấy AI nắm được cấu trúc chủ đề. Phải báo cáo con số thật, kể cả khi thấp.

**Sentiment đo giọng điệu ngôn ngữ, không đo trạng thái tâm lý.** Không được viết "phân tích cảm xúc chứng minh giáo viên nước ngoài bất mãn". Chỉ được viết "diễn ngôn của nhóm nước ngoài có giọng điệu tiêu cực hơn một cách có ý nghĩa thống kê".

## 4. Notebook mixed methods — những điều cần kiểm tra

### 4.1. Ánh xạ mã trường

Trong ô 5.1 có dòng:

```python
SCHOOL_MAP = {1: 'TrA', 2: 'TrB', 3: 'TrC', 4: 'TrD', 5: 'TrE'}
```

**Phải xác nhận ánh xạ này đúng với thực tế.** Nếu mã trường 1 trong file khảo sát không phải TrA trong dữ liệu phỏng vấn, toàn bộ tương quan cấp trường sẽ vô nghĩa. Đây là lỗi khó phát hiện vì kết quả vẫn chạy ra số.

### 4.2. Giới hạn n = 5 trường

Mọi tương quan cấp trường chỉ có 5 điểm dữ liệu. Notebook cố tình dùng Spearman và in cảnh báo. Khi viết bài:

- Được phép viết: "mẫu hình gợi ý ở cấp trường cho thấy…"
- Không được viết: "tương quan cấp trường cho thấy r = 0,8, p < 0,05…"

### 4.3. Joint display cần được hoàn thiện thủ công

Notebook sinh ra khung joint display với cột định lượng đã điền tự động, nhưng cột định tính ghi "Cần điền". Đây là chủ ý: **trích dẫn minh họa phải do nghiên cứu sinh chọn**, dựa trên hiểu biết ngữ cảnh, không thể tự động hóa.

Quy trình đề xuất: mở `ket_qua_ai/00_segments_tidy.csv`, lọc theo khối chủ đề tương ứng, chọn 2–3 trích dẫn tiêu biểu cho mỗi cấu phần, dán vào cột định tính của `ket_qua_mixed/01_joint_display.xlsx`.

## 5. Kết quả MI và clustering — tóm tắt để trích dẫn

### 5.1. Bất biến đo lường (Việt Nam vs nước ngoài)

| Kiểm định | Kết quả | Ý nghĩa |
|---|---|---|
| Configural | 6/8 thang đo đạt | Cấu trúc nhân tố tái hiện ở cả hai nhóm |
| Tucker's φ cho GLO | 0,994 | Tải nhân tố tương đương |
| DIF cấp item | 4/21 bị gắn cờ, 0/8 ở GLO | GLO không có sai lệch item |
| Scalar invariance | **Không thiết lập được** | n = 36 quá nhỏ |

Câu nên dùng trong bài báo:

> Full scalar invariance could not be established due to the small expatriate subsample (n = 36). Following recommendations for small-sample cross-group comparison, configural invariance, Tucker's congruence coefficients and item-level DIF screening were used instead. The focal construct (quality culture) showed excellent loading congruence (φ = .994) and no flagged items, supporting cautious interpretation of the observed group difference.

### 5.2. Cấu trúc lồng nhau

| Kiểm định | Kết quả | Ý nghĩa |
|---|---|---|
| ICC(1) của GLO | 0,081 | 8,1% phương sai do khác biệt trường |
| Design effect GLO | 5,49 | N hiệu dụng ≈ 51 |
| SE theo cụm, 5 phương trình kết quả | Tất cả không đổi kết luận | Phát hiện trung tâm vững |
| SE theo cụm, phương trình GLO | STR và RES **mất ý nghĩa** | Phải báo cáo trung thực |

Câu nên dùng trong bài báo:

> Because respondents were nested within five schools, all models were re-estimated with cluster-robust standard errors. Although standard errors increased by up to a factor of 2.05, all five quality-culture-to-outcome paths retained significance. In the antecedent equation, two coefficients (strategic structures, responsibility) lost significance under clustering and are therefore reported as not robust.

## 6. Danh mục kiểm tra trước khi nộp bài

- [ ] Đã chạy lại toàn bộ notebook trong kernel sạch, không lỗi
- [ ] Số liệu trong bài khớp với file CSV/JSON mới nhất
- [ ] Đã xác nhận ánh xạ mã trường trong notebook mixed
- [ ] Đã báo cáo kappa/ARI thật, kể cả khi thấp
- [ ] Đã nêu rõ scalar invariance chưa thiết lập được
- [ ] Đã báo cáo STR và RES không vững trước hiệu chỉnh cụm
- [ ] Đã tách rõ trích dẫn phỏng vấn và diễn giải của NCS
- [ ] Không dùng từ nhân quả cho dữ liệu cắt ngang
- [ ] Đã khai báo dùng AI trong phần phương pháp
- [ ] Trích dẫn PhoBERT, BERTopic và các nguồn phương pháp

## 7. Khai báo sử dụng AI

Nhiều tạp chí nay yêu cầu khai báo. Mẫu câu:

> Qualitative data were coded manually in MaxQDA by the first author. To assess the robustness of the coding structure and to identify large-scale discourse patterns, PhoBERT (Nguyen & Nguyen, 2020) sentence embeddings were computed for all coded segments, followed by unsupervised clustering, topic modelling and log-odds discourse comparison. Automated procedures served as a secondary analytical layer; all interpretive claims rest on the manual coding, and agreement between automated and manual classification is reported (Cohen's κ = [x]).
